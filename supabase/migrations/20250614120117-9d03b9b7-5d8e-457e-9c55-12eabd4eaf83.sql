
-- Add columns for partner preferences and visibility to profiles table
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS partner_age_range_min INTEGER,
  ADD COLUMN IF NOT EXISTS partner_age_range_max INTEGER,
  ADD COLUMN IF NOT EXISTS partner_location TEXT,
  ADD COLUMN IF NOT EXISTS profile_visibility TEXT;

-- Create storage bucket for profile photos if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-photos', 'profile-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies to avoid conflicts before creating new ones
DROP POLICY IF EXISTS "Public Read Access for Profile Photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Insert for Profile Photos" ON storage.objects;
DROP POLICY IF EXISTS "Owner Update for Profile Photos" ON storage.objects;
DROP POLICY IF EXISTS "Owner Delete for Profile Photos" ON storage.objects;

-- Setup RLS policies for the profile-photos bucket
-- Allow public read access for anyone to see profile photos
CREATE POLICY "Public Read Access for Profile Photos"
ON storage.objects FOR SELECT
TO public
USING ( bucket_id = 'profile-photos' );

-- Allow any authenticated user to upload a photo
CREATE POLICY "Authenticated Insert for Profile Photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'profile-photos' );

-- Allow users to update their own photos
CREATE POLICY "Owner Update for Profile Photos"
ON storage.objects FOR UPDATE
TO authenticated
USING ( auth.uid() = owner );

-- Allow users to delete their own photos
CREATE POLICY "Owner Delete for Profile Photos"
ON storage.objects FOR DELETE
TO authenticated
USING ( auth.uid() = owner );

