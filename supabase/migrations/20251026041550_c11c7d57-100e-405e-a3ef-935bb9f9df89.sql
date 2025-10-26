-- Add missing columns to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS languages TEXT[];
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS date_of_birth DATE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS time_of_birth TIME;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS place_of_birth TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS hide_from_search BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS notification_settings JSONB DEFAULT '{"email": true, "push": true, "match": true, "message": true}'::jsonb;

-- Add missing column to matches
ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS last_message_at TIMESTAMP WITH TIME ZONE;

-- Function to approve verification request
CREATE OR REPLACE FUNCTION public.approve_verification_request(request_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.verification_requests
  SET status = 'approved',
      reviewed_by = auth.uid(),
      reviewed_at = now()
  WHERE id = request_id;
  
  -- Update user's verified status
  UPDATE public.profiles
  SET verified = true, is_verified = true
  WHERE id = (SELECT user_id FROM public.verification_requests WHERE id = request_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function to reject verification request
CREATE OR REPLACE FUNCTION public.reject_verification_request(request_id UUID, reason TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE public.verification_requests
  SET status = 'rejected',
      reviewed_by = auth.uid(),
      reviewed_at = now(),
      rejection_reason = reason
  WHERE id = request_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create audit_logs table for security logging
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  event_data JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON public.audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_event_type ON public.audit_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view audit logs" ON public.audit_logs
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Function to log audit events
CREATE OR REPLACE FUNCTION public.log_audit_event(
  event_type_param TEXT,
  event_data_param JSONB DEFAULT NULL,
  ip_address_param INET DEFAULT NULL,
  user_agent_param TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  log_id UUID;
BEGIN
  INSERT INTO public.audit_logs (user_id, event_type, event_data, ip_address, user_agent)
  VALUES (auth.uid(), event_type_param, event_data_param, ip_address_param, user_agent_param)
  RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update mark_messages_as_read to also update last_message_at
CREATE OR REPLACE FUNCTION public.mark_messages_as_read(p_match_id UUID, p_user_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.messages
  SET read_at = now()
  WHERE match_id = p_match_id
    AND sender_id != p_user_id
    AND read_at IS NULL;
  
  -- Update last_message_at on the match
  UPDATE public.matches
  SET last_message_at = now()
  WHERE id = p_match_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;