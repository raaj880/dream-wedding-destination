
-- Phase 1: Critical RLS Policy Cleanup
-- First, let's clean up duplicate and conflicting policies

-- Drop existing conflicting policies on profiles table
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can manage their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Authenticated users can view other profiles" ON public.profiles;

-- Create consolidated, secure policies for profiles
CREATE POLICY "Users can manage own profile" ON public.profiles
FOR ALL
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view active profiles for matching" ON public.profiles
FOR SELECT
USING (
  auth.role() = 'authenticated' 
  AND account_status = 'active'
  AND (
    profile_visibility = 'everyone' 
    OR (profile_visibility = 'matches' AND EXISTS (
      SELECT 1 FROM public.matches 
      WHERE (user1_id = auth.uid() AND user2_id = id) 
         OR (user2_id = auth.uid() AND user1_id = id)
      AND status = 'active'
    ))
  )
);

-- Clean up user_interactions policies
DROP POLICY IF EXISTS "Users can view their own interactions" ON public.user_interactions;
DROP POLICY IF EXISTS "Users can create their own interactions" ON public.user_interactions;
DROP POLICY IF EXISTS "Users can update their own interactions" ON public.user_interactions;
DROP POLICY IF EXISTS "Allow users to insert their own interactions" ON public.user_interactions;
DROP POLICY IF EXISTS "Allow users to view interactions related to them" ON public.user_interactions;

-- Create consolidated policies for user_interactions
CREATE POLICY "Users can manage own interactions" ON public.user_interactions
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view interactions about them" ON public.user_interactions
FOR SELECT
USING (auth.uid() = target_user_id);

-- Clean up matches policies
DROP POLICY IF EXISTS "Users can view their own matches" ON public.matches;
DROP POLICY IF EXISTS "Users can create matches" ON public.matches;
DROP POLICY IF EXISTS "System can create matches" ON public.matches;
DROP POLICY IF EXISTS "Users can update their own matches" ON public.matches;

-- Create consolidated policies for matches
CREATE POLICY "Users can view own matches" ON public.matches
FOR SELECT
USING (auth.uid() = user1_id OR auth.uid() = user2_id);

CREATE POLICY "System can create matches" ON public.matches
FOR INSERT
WITH CHECK (true); -- Matches are created by system functions

CREATE POLICY "Users can update own matches" ON public.matches
FOR UPDATE
USING (auth.uid() = user1_id OR auth.uid() = user2_id)
WITH CHECK (auth.uid() = user1_id OR auth.uid() = user2_id);

-- Clean up messages policies
DROP POLICY IF EXISTS "Users can view messages from their matches" ON public.messages;
DROP POLICY IF EXISTS "Users can send messages to their matches" ON public.messages;
DROP POLICY IF EXISTS "Users can view messages in their matches" ON public.messages;
DROP POLICY IF EXISTS "Users can insert messages in their matches" ON public.messages;
DROP POLICY IF EXISTS "Users can update their own messages" ON public.messages;
DROP POLICY IF EXISTS "Users can delete their own messages" ON public.messages;
DROP POLICY IF EXISTS "Users can update message read status" ON public.messages;

-- Create consolidated policies for messages
CREATE POLICY "Users can view match messages" ON public.messages
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.matches
    WHERE matches.id = messages.match_id
      AND (matches.user1_id = auth.uid() OR matches.user2_id = auth.uid())
      AND matches.status = 'active'
  )
);

CREATE POLICY "Users can send match messages" ON public.messages
FOR INSERT
WITH CHECK (
  auth.uid() = sender_id AND
  EXISTS (
    SELECT 1 FROM public.matches
    WHERE matches.id = messages.match_id
      AND (matches.user1_id = auth.uid() OR matches.user2_id = auth.uid())
      AND matches.status = 'active'
  )
);

CREATE POLICY "Users can update own messages" ON public.messages
FOR UPDATE
USING (
  sender_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.matches
    WHERE matches.id = messages.match_id
      AND (matches.user1_id = auth.uid() OR matches.user2_id = auth.uid())
      AND matches.status = 'active'
  )
)
WITH CHECK (
  sender_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.matches
    WHERE matches.id = messages.match_id
      AND (matches.user1_id = auth.uid() OR matches.user2_id = auth.uid())
      AND matches.status = 'active'
  )
);

-- Security definer function to safely check user roles (for future use)
CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT 'user'::text; -- Default role for now, can be extended later
$$;

-- Function to validate profile data
CREATE OR REPLACE FUNCTION public.validate_profile_data()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Validate email format if provided
  IF NEW.full_name IS NOT NULL AND length(NEW.full_name) < 2 THEN
    RAISE EXCEPTION 'Full name must be at least 2 characters long';
  END IF;
  
  -- Validate age range
  IF NEW.age IS NOT NULL AND (NEW.age < 18 OR NEW.age > 100) THEN
    RAISE EXCEPTION 'Age must be between 18 and 100';
  END IF;
  
  -- Validate partner age range
  IF NEW.partner_age_range_min IS NOT NULL AND NEW.partner_age_range_max IS NOT NULL THEN
    IF NEW.partner_age_range_min < 18 OR NEW.partner_age_range_max > 100 THEN
      RAISE EXCEPTION 'Partner age range must be between 18 and 100';
    END IF;
    IF NEW.partner_age_range_min > NEW.partner_age_range_max THEN
      RAISE EXCEPTION 'Partner minimum age cannot be greater than maximum age';
    END IF;
  END IF;
  
  -- Sanitize bio content (basic HTML tag removal)
  IF NEW.bio IS NOT NULL THEN
    NEW.bio := regexp_replace(NEW.bio, '<[^>]*>', '', 'g');
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for profile validation
DROP TRIGGER IF EXISTS validate_profile_trigger ON public.profiles;
CREATE TRIGGER validate_profile_trigger
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.validate_profile_data();

-- Add audit logging table for security monitoring
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  action text NOT NULL,
  table_name text NOT NULL,
  record_id uuid,
  old_data jsonb,
  new_data jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only allow viewing own audit logs
CREATE POLICY "Users can view own audit logs" ON public.audit_logs
FOR SELECT
USING (auth.uid() = user_id);

-- Function to log sensitive operations
CREATE OR REPLACE FUNCTION public.log_audit_event(
  p_action text,
  p_table_name text,
  p_record_id uuid DEFAULT NULL,
  p_old_data jsonb DEFAULT NULL,
  p_new_data jsonb DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.audit_logs (
    user_id,
    action,
    table_name,
    record_id,
    old_data,
    new_data
  ) VALUES (
    auth.uid(),
    p_action,
    p_table_name,
    p_record_id,
    p_old_data,
    p_new_data
  );
END;
$$;

-- Add session management table for better auth control
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_token text NOT NULL,
  ip_address inet,
  user_agent text,
  expires_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  last_activity timestamp with time zone DEFAULT now()
);

-- Enable RLS on user_sessions
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own sessions" ON public.user_sessions
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Function to clean up expired sessions
CREATE OR REPLACE FUNCTION public.cleanup_expired_sessions()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
AS $$
  DELETE FROM public.user_sessions 
  WHERE expires_at < now() OR last_activity < now() - interval '30 days';
$$;
