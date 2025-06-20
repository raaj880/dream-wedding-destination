
-- Add Jathaka (Horoscope) details to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS time_of_birth time;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS place_of_birth text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS rashi text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS nakshatra text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS gothra text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS dosha text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS jathakam_url text;

-- Add comment to document the new columns
COMMENT ON COLUMN profiles.time_of_birth IS 'Time of birth for horoscope calculations';
COMMENT ON COLUMN profiles.place_of_birth IS 'Place of birth (City, State, Country)';
COMMENT ON COLUMN profiles.rashi IS 'Moon sign (one of 12 rashis)';
COMMENT ON COLUMN profiles.nakshatra IS 'Birth star (one of 27 nakshatras)';
COMMENT ON COLUMN profiles.gothra IS 'Gothra/lineage information';
COMMENT ON COLUMN profiles.dosha IS 'Astrological dosha information (e.g., Kuja Dosha, Naga Dosha, None)';
COMMENT ON COLUMN profiles.jathakam_url IS 'URL to uploaded horoscope document/image';
