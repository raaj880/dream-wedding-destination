
-- Add read_at column to messages table for read receipts
ALTER TABLE public.messages 
ADD COLUMN IF NOT EXISTS read_at timestamp with time zone;

-- Update the existing message policy to allow users to update read_at
DROP POLICY IF EXISTS "Users can update message read status" ON public.messages;
CREATE POLICY "Users can update message read status"
ON public.messages
FOR UPDATE
USING (
  EXISTS (
    SELECT 1
    FROM public.matches
    WHERE matches.id = messages.match_id
      AND (matches.user1_id = auth.uid() OR matches.user2_id = auth.uid())
      AND matches.status = 'active'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.matches
    WHERE matches.id = messages.match_id
      AND (matches.user1_id = auth.uid() OR matches.user2_id = auth.uid())
      AND matches.status = 'active'
  )
);

-- Create a function to mark messages as read
CREATE OR REPLACE FUNCTION public.mark_messages_as_read(
  p_match_id uuid,
  p_message_ids uuid[]
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update messages to mark them as read
  UPDATE public.messages
  SET read_at = now()
  WHERE id = ANY(p_message_ids)
    AND match_id = p_match_id
    AND sender_id != auth.uid()
    AND read_at IS NULL;
END;
$$;
