
-- Create a new type for different kinds of notifications
CREATE TYPE public.notification_type AS ENUM (
    'new_match',
    'new_message',
    'profile_view'
);

-- Create the table to store notifications
CREATE TABLE public.notifications (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL,
    type public.notification_type NOT NULL,
    data jsonb,
    is_read boolean NOT NULL DEFAULT false,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

-- Add comments for clarity
COMMENT ON TABLE public.notifications IS 'Stores notifications for users.';
COMMENT ON COLUMN public.notifications.data IS 'Payload with context-specific data, e.g., { "match_id": "...", "sender_name": "..." }.';

-- Enable Row-Level Security for the new table
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Add policies to control access to notifications
CREATE POLICY "Users can view their own notifications"
ON public.notifications FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
ON public.notifications FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create a function to generate a notification for a new match
CREATE OR REPLACE FUNCTION public.handle_new_match_notification()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    user1_profile record;
    user2_profile record;
BEGIN
    -- Get profiles of both users in the match
    SELECT id, full_name INTO user1_profile FROM public.profiles WHERE id = NEW.user1_id;
    SELECT id, full_name INTO user2_profile FROM public.profiles WHERE id = NEW.user2_id;

    -- Insert notification for user 1
    INSERT INTO public.notifications (user_id, type, data)
    VALUES (
        NEW.user1_id,
        'new_match',
        jsonb_build_object(
            'match_id', NEW.id,
            'matched_user_id', NEW.user2_id,
            'matched_user_name', user2_profile.full_name
        )
    );

    -- Insert notification for user 2
    INSERT INTO public.notifications (user_id, type, data)
    VALUES (
        NEW.user2_id,
        'new_match',
        jsonb_build_object(
            'match_id', NEW.id,
            'matched_user_id', NEW.user1_id,
            'matched_user_name', user1_profile.full_name
        )
    );
    RETURN NEW;
END;
$$;

-- Create a trigger that runs the function when a new match is created
CREATE TRIGGER on_new_match
    AFTER INSERT ON public.matches
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_match_notification();

-- Create a function to generate a notification for a new message
CREATE OR REPLACE FUNCTION public.handle_new_message_notification()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    recipient_id uuid;
    sender_name text;
    match_info record;
BEGIN
    -- Determine who the recipient is
    SELECT user1_id, user2_id INTO match_info FROM public.matches WHERE id = NEW.match_id;
    
    IF NEW.sender_id = match_info.user1_id THEN
        recipient_id := match_info.user2_id;
    ELSE
        recipient_id := match_info.user1_id;
    END IF;

    -- Get the sender's name
    SELECT full_name INTO sender_name FROM public.profiles WHERE id = NEW.sender_id;

    -- Insert a notification for the recipient
    INSERT INTO public.notifications (user_id, type, data)
    VALUES (
        recipient_id,
        'new_message',
        jsonb_build_object(
            'match_id', NEW.match_id,
            'sender_id', NEW.sender_id,
            'sender_name', sender_name,
            'message_preview', left(NEW.content, 50)
        )
    );
    RETURN NEW;
END;
$$;

-- Create a trigger that runs the function when a new message is sent
CREATE TRIGGER on_new_message
    AFTER INSERT ON public.messages
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_message_notification();
    
-- Create a function to generate a notification for a profile view
CREATE OR REPLACE FUNCTION public.handle_profile_view_notification()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    viewer_name text;
BEGIN
    -- Only create a notification for 'view' interactions
    IF NEW.interaction_type = 'view' THEN
        -- Get viewer's name
        SELECT full_name INTO viewer_name FROM public.profiles WHERE id = NEW.user_id;

        -- Insert notification for the user whose profile was viewed
        INSERT INTO public.notifications (user_id, type, data)
        VALUES (
            NEW.target_user_id,
            'profile_view',
            jsonb_build_object(
                'viewer_id', NEW.user_id,
                'viewer_name', viewer_name
            )
        );
    END IF;
    RETURN NEW;
END;
$$;

-- Create a trigger that runs the function when a profile is viewed
CREATE TRIGGER on_profile_view
    AFTER INSERT ON public.user_interactions
    FOR EACH ROW EXECUTE FUNCTION public.handle_profile_view_notification();

-- Enable real-time updates for the new notifications table
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
