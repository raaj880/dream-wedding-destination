-- Security Fix 1: Update profiles SELECT policy to respect block relationships
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

CREATE POLICY "Users can view discoverable profiles" ON public.profiles
  FOR SELECT USING (
    auth.uid() = id OR -- Users can always view their own profile
    (
      -- Profile is not hidden from search
      (hide_from_search IS FALSE OR hide_from_search IS NULL) AND
      -- Neither user has blocked the other
      NOT EXISTS (
        SELECT 1 FROM user_interactions
        WHERE (
          (user_id = auth.uid() AND target_user_id = profiles.id AND interaction_type = 'block')
          OR
          (user_id = profiles.id AND target_user_id = auth.uid() AND interaction_type = 'block')
        )
      )
    )
  );

-- Security Fix 2: Add database-level validation constraints
ALTER TABLE profiles 
  ADD CONSTRAINT check_age_valid CHECK (age IS NULL OR (age >= 18 AND age <= 100)),
  ADD CONSTRAINT check_bio_length CHECK (bio IS NULL OR char_length(bio) <= 2000),
  ADD CONSTRAINT check_full_name_length CHECK (char_length(full_name) BETWEEN 1 AND 100),
  ADD CONSTRAINT check_height_length CHECK (height IS NULL OR char_length(height) <= 20),
  ADD CONSTRAINT check_profession_length CHECK (profession IS NULL OR char_length(profession) <= 100),
  ADD CONSTRAINT check_education_length CHECK (education IS NULL OR char_length(education) <= 100),
  ADD CONSTRAINT check_location_length CHECK (location IS NULL OR char_length(location) <= 100);

ALTER TABLE messages
  ADD CONSTRAINT check_content_length CHECK (char_length(content) BETWEEN 1 AND 5000);

ALTER TABLE notifications
  ADD CONSTRAINT check_title_length CHECK (char_length(title) BETWEEN 1 AND 200),
  ADD CONSTRAINT check_message_length CHECK (char_length(message) BETWEEN 1 AND 1000);

COMMENT ON TABLE profiles IS 'User profiles with privacy controls and validation constraints';
COMMENT ON TABLE matches IS 'Matches created only after mutual likes verification';