
-- Get count of all profiles in the database
SELECT COUNT(*) as total_profiles FROM public.profiles;

-- Also get some additional stats about the profiles
SELECT 
  COUNT(*) as total_profiles,
  COUNT(CASE WHEN full_name IS NOT NULL THEN 1 END) as profiles_with_names,
  COUNT(CASE WHEN photos IS NOT NULL AND array_length(photos, 1) > 0 THEN 1 END) as profiles_with_photos,
  COUNT(CASE WHEN verified = true THEN 1 END) as verified_profiles,
  COUNT(CASE WHEN is_online = true THEN 1 END) as online_profiles
FROM public.profiles;
