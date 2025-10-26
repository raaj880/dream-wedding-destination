-- Add jathaka/horoscope columns to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS rashi TEXT,
ADD COLUMN IF NOT EXISTS nakshatra TEXT,
ADD COLUMN IF NOT EXISTS gothra TEXT,
ADD COLUMN IF NOT EXISTS dosha TEXT,
ADD COLUMN IF NOT EXISTS jathakam_url TEXT;

-- Add created_at column to verification_requests (code expects this)
ALTER TABLE public.verification_requests 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Update existing rows to have created_at = submitted_at
UPDATE public.verification_requests 
SET created_at = submitted_at 
WHERE created_at IS NULL OR created_at != submitted_at;