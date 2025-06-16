
-- First, let's add RLS policies to existing tables to ensure proper access control

-- Enable RLS on matches table if not already enabled
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own matches
DROP POLICY IF EXISTS "Users can view their own matches" ON public.matches;
CREATE POLICY "Users can view their own matches"
ON public.matches
FOR SELECT
USING (user1_id = auth.uid() OR user2_id = auth.uid());

-- Policy: Users can insert matches (system-level, typically via functions)
DROP POLICY IF EXISTS "Users can create matches" ON public.matches;
CREATE POLICY "Users can create matches"
ON public.matches
FOR INSERT
WITH CHECK (user1_id = auth.uid() OR user2_id = auth.uid());

-- Enable RLS on messages table if not already enabled
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view messages in their matches only
DROP POLICY IF EXISTS "Users can view messages in their matches" ON public.messages;
CREATE POLICY "Users can view messages in their matches"
ON public.messages
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.matches
    WHERE matches.id = messages.match_id
      AND (matches.user1_id = auth.uid() OR matches.user2_id = auth.uid())
      AND matches.status = 'active'
  )
);

-- Policy: Users can insert messages in their matches only
DROP POLICY IF EXISTS "Users can insert messages in their matches" ON public.messages;
CREATE POLICY "Users can insert messages in their matches"
ON public.messages
FOR INSERT
WITH CHECK (
  (sender_id = auth.uid()) AND
  EXISTS (
    SELECT 1
    FROM public.matches
    WHERE matches.id = messages.match_id
      AND (matches.user1_id = auth.uid() OR matches.user2_id = auth.uid())
      AND matches.status = 'active'
  )
);

-- Policy: Users can update their own messages
DROP POLICY IF EXISTS "Users can update their own messages" ON public.messages;
CREATE POLICY "Users can update their own messages"
ON public.messages
FOR UPDATE
USING (sender_id = auth.uid())
WITH CHECK (sender_id = auth.uid());

-- Policy: Users can delete their own messages
DROP POLICY IF EXISTS "Users can delete their own messages" ON public.messages;
CREATE POLICY "Users can delete their own messages"
ON public.messages
FOR DELETE
USING (sender_id = auth.uid());

-- Enable RLS on user_interactions table
ALTER TABLE public.user_interactions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own interactions
DROP POLICY IF EXISTS "Users can view their own interactions" ON public.user_interactions;
CREATE POLICY "Users can view their own interactions"
ON public.user_interactions
FOR SELECT
USING (user_id = auth.uid() OR target_user_id = auth.uid());

-- Policy: Users can create their own interactions
DROP POLICY IF EXISTS "Users can create their own interactions" ON public.user_interactions;
CREATE POLICY "Users can create their own interactions"
ON public.user_interactions
FOR INSERT
WITH CHECK (user_id = auth.uid());

-- Policy: Users can update their own interactions
DROP POLICY IF EXISTS "Users can update their own interactions" ON public.user_interactions;
CREATE POLICY "Users can update their own interactions"
ON public.user_interactions
FOR UPDATE
USING (user_id = auth.uid());

-- Create a function to check if two users have mutual likes (are matched)
CREATE OR REPLACE FUNCTION public.check_mutual_match(user1_uuid uuid, user2_uuid uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if both users liked each other
  RETURN EXISTS (
    SELECT 1 FROM public.user_interactions 
    WHERE user_id = user1_uuid 
    AND target_user_id = user2_uuid 
    AND interaction_type IN ('like', 'superlike')
  ) AND EXISTS (
    SELECT 1 FROM public.user_interactions 
    WHERE user_id = user2_uuid 
    AND target_user_id = user1_uuid 
    AND interaction_type IN ('like', 'superlike')
  );
END;
$$;

-- Create a function to get match ID for two users
CREATE OR REPLACE FUNCTION public.get_match_id(user1_uuid uuid, user2_uuid uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  match_id uuid;
BEGIN
  -- Get existing match ID
  SELECT id INTO match_id
  FROM public.matches
  WHERE (user1_id = user1_uuid AND user2_id = user2_uuid)
     OR (user1_id = user2_uuid AND user2_id = user1_uuid)
  AND status = 'active';
  
  RETURN match_id;
END;
$$;
