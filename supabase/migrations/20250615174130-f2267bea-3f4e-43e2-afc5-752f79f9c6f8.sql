
-- Enable Row Level Security for matches table
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own matches
DROP POLICY IF EXISTS "Users can view their own matches" ON public.matches;
CREATE POLICY "Users can view their own matches"
ON public.matches
FOR SELECT
USING (user1_id = auth.uid() OR user2_id = auth.uid());

-- Enable Row Level Security for messages table
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view messages in their matches
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
  )
);

-- Policy: Users can insert messages in their matches
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
