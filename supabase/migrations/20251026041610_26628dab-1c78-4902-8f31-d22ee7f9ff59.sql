-- Add more missing columns to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS marry_timeframe TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS partner_age_range_min INTEGER;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS partner_age_range_max INTEGER;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS partner_location TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS rashi TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS nakshatra TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS gothra TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS dosha TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS jathakam_url TEXT;