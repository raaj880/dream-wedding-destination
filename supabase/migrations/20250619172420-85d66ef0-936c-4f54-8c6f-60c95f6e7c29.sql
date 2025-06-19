
-- Add is_verified column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_verified boolean DEFAULT false;

-- Create verification_requests table
CREATE TABLE IF NOT EXISTS public.verification_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, status) -- Prevent multiple pending requests per user
);

-- Enable RLS on verification_requests
ALTER TABLE public.verification_requests ENABLE ROW LEVEL SECURITY;

-- Users can view their own verification requests
CREATE POLICY "Users can view own verification requests"
ON public.verification_requests
FOR SELECT
USING (auth.uid() = user_id);

-- Users can create their own verification requests
CREATE POLICY "Users can create verification requests"
ON public.verification_requests
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create an index for efficient admin queries
CREATE INDEX IF NOT EXISTS idx_verification_requests_status_created 
ON public.verification_requests(status, created_at DESC);

-- Function to handle verification approval
CREATE OR REPLACE FUNCTION public.approve_verification_request(request_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  target_user_id uuid;
BEGIN
  -- Get the user_id from the request
  SELECT user_id INTO target_user_id
  FROM public.verification_requests
  WHERE id = request_id AND status = 'pending';
  
  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'Verification request not found or already processed';
  END IF;
  
  -- Update the user's profile to verified
  UPDATE public.profiles
  SET is_verified = true
  WHERE id = target_user_id;
  
  -- Update the request status
  UPDATE public.verification_requests
  SET status = 'approved', updated_at = now()
  WHERE id = request_id;
END;
$$;

-- Function to handle verification rejection
CREATE OR REPLACE FUNCTION public.reject_verification_request(request_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update the request status
  UPDATE public.verification_requests
  SET status = 'rejected', updated_at = now()
  WHERE id = request_id AND status = 'pending';
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Verification request not found or already processed';
  END IF;
END;
$$;
