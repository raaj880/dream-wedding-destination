-- Add missing columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS profile_visibility TEXT DEFAULT 'public' CHECK (profile_visibility IN ('public', 'connections_only', 'private')),
ADD COLUMN IF NOT EXISTS show_online_status BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS hide_from_search BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS notification_settings JSONB DEFAULT '{"matches": true, "messages": true, "likes": true, "profile_views": false}'::jsonb,
ADD COLUMN IF NOT EXISTS account_status TEXT DEFAULT 'active' CHECK (account_status IN ('active', 'paused', 'deactivated')),
ADD COLUMN IF NOT EXISTS time_of_birth TIME,
ADD COLUMN IF NOT EXISTS place_of_birth TEXT,
ADD COLUMN IF NOT EXISTS partner_age_range_min INTEGER CHECK (partner_age_range_min >= 18 AND partner_age_range_min <= 100),
ADD COLUMN IF NOT EXISTS partner_age_range_max INTEGER CHECK (partner_age_range_max >= 18 AND partner_age_range_max <= 100),
ADD COLUMN IF NOT EXISTS partner_location TEXT[];

-- Create verification_requests table
CREATE TABLE IF NOT EXISTS public.verification_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  verification_photos TEXT[] NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id),
  rejection_reason TEXT,
  UNIQUE(user_id)
);

-- Enable RLS on verification_requests
ALTER TABLE public.verification_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for verification_requests
DROP POLICY IF EXISTS "Users can view their own verification requests" ON public.verification_requests;
CREATE POLICY "Users can view their own verification requests" ON public.verification_requests
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own verification request" ON public.verification_requests;
CREATE POLICY "Users can create their own verification request" ON public.verification_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own pending verification request" ON public.verification_requests;
CREATE POLICY "Users can update their own pending verification request" ON public.verification_requests
  FOR UPDATE USING (auth.uid() = user_id AND status = 'pending');

-- Create audit_logs table for security logging
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only allow reading audit logs (inserts will be done via function)
DROP POLICY IF EXISTS "Users can view their own audit logs" ON public.audit_logs;
CREATE POLICY "Users can view their own audit logs" ON public.audit_logs
  FOR SELECT USING (auth.uid() = user_id);

-- Function to check mutual match
CREATE OR REPLACE FUNCTION public.check_mutual_match(user1_id UUID, user2_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user1_likes BOOLEAN;
  user2_likes BOOLEAN;
BEGIN
  -- Check if user1 liked user2
  SELECT EXISTS (
    SELECT 1 FROM user_interactions
    WHERE user_id = user1_id 
    AND target_user_id = user2_id 
    AND interaction_type IN ('like', 'superlike')
  ) INTO user1_likes;
  
  -- Check if user2 liked user1
  SELECT EXISTS (
    SELECT 1 FROM user_interactions
    WHERE user_id = user2_id 
    AND target_user_id = user1_id 
    AND interaction_type IN ('like', 'superlike')
  ) INTO user2_likes;
  
  RETURN user1_likes AND user2_likes;
END;
$$;

-- Function to get match ID between two users
CREATE OR REPLACE FUNCTION public.get_match_id(user1_id UUID, user2_id UUID)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  match_record_id UUID;
  min_user_id UUID;
  max_user_id UUID;
BEGIN
  -- Ensure consistent ordering
  IF user1_id < user2_id THEN
    min_user_id := user1_id;
    max_user_id := user2_id;
  ELSE
    min_user_id := user2_id;
    max_user_id := user1_id;
  END IF;
  
  -- Get match ID
  SELECT id INTO match_record_id
  FROM matches
  WHERE user1_id = min_user_id 
  AND user2_id = max_user_id;
  
  RETURN match_record_id;
END;
$$;

-- Function to mark messages as read
CREATE OR REPLACE FUNCTION public.mark_messages_as_read(p_match_id UUID, p_user_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE messages
  SET read_at = now()
  WHERE match_id = p_match_id
  AND sender_id != p_user_id
  AND read_at IS NULL;
END;
$$;

-- Function to approve verification request
CREATE OR REPLACE FUNCTION public.approve_verification_request(request_id UUID, reviewer_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Get user_id from verification request
  SELECT user_id INTO v_user_id
  FROM verification_requests
  WHERE id = request_id;
  
  -- Update verification request
  UPDATE verification_requests
  SET status = 'approved',
      reviewed_at = now(),
      reviewed_by = reviewer_id
  WHERE id = request_id;
  
  -- Update profile verified status
  UPDATE profiles
  SET verified = TRUE
  WHERE id = v_user_id;
END;
$$;

-- Function to reject verification request
CREATE OR REPLACE FUNCTION public.reject_verification_request(request_id UUID, reviewer_id UUID, reason TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE verification_requests
  SET status = 'rejected',
      reviewed_at = now(),
      reviewed_by = reviewer_id,
      rejection_reason = reason
  WHERE id = request_id;
END;
$$;

-- Function to log audit events
CREATE OR REPLACE FUNCTION public.log_audit_event(
  p_user_id UUID,
  p_action TEXT,
  p_details JSONB DEFAULT NULL,
  p_ip_address TEXT DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO audit_logs (user_id, action, details, ip_address, user_agent)
  VALUES (p_user_id, p_action, p_details, p_ip_address, p_user_agent);
END;
$$;

-- Create indexes for new columns
CREATE INDEX IF NOT EXISTS idx_profiles_account_status ON public.profiles(account_status);
CREATE INDEX IF NOT EXISTS idx_profiles_hide_from_search ON public.profiles(hide_from_search);
CREATE INDEX IF NOT EXISTS idx_verification_requests_status ON public.verification_requests(status);
CREATE INDEX IF NOT EXISTS idx_verification_requests_user_id ON public.verification_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at);