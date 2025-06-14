
-- Add columns for new settings to the profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS show_online_status BOOLEAN NOT NULL DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS hide_from_search BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS notification_settings JSONB NOT NULL DEFAULT '{"new_matches": true, "messages": true, "profile_views": false}'::jsonb,
ADD COLUMN IF NOT EXISTS account_status TEXT NOT NULL DEFAULT 'active';

-- Set a default for profile_visibility and make it non-nullable
ALTER TABLE public.profiles
ALTER COLUMN profile_visibility SET DEFAULT 'everyone';

UPDATE public.profiles SET profile_visibility = 'everyone' WHERE profile_visibility IS NULL;

ALTER TABLE public.profiles
ALTER COLUMN profile_visibility SET NOT NULL;

-- Enable Row Level Security on profiles table to protect user data
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows users to manage their own profile (update, delete)
CREATE POLICY "Users can manage their own profile"
ON public.profiles
FOR ALL
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Create a policy that allows authenticated users to view other profiles (for matching)
CREATE POLICY "Authenticated users can view other profiles"
ON public.profiles
FOR SELECT
USING (auth.role() = 'authenticated');
