
-- Step 1: Drop the old check constraint that was causing the error.
ALTER TABLE public.user_interactions DROP CONSTRAINT IF EXISTS user_interactions_interaction_type_check;

-- Step 2: Drop dependent policies if they exist from a partial run of the failed migration.
DROP POLICY IF EXISTS "Allow users to insert their own interactions" ON public.user_interactions;
DROP POLICY IF EXISTS "Allow users to view interactions related to them" ON public.user_interactions;

-- Step 3: Drop the enum type if it exists from a partial run to ensure a clean slate.
DROP TYPE IF EXISTS public.interaction_enum;

-- Step 4: Create the new ENUM type from scratch, now including 'view'.
CREATE TYPE public.interaction_enum AS ENUM (
  'like',
  'pass',
  'superlike',
  'block',
  'view'
);

-- Step 5: Update the 'user_interactions' table to use the new, more restrictive ENUM type.
ALTER TABLE public.user_interactions
  ALTER COLUMN interaction_type TYPE public.interaction_enum
  USING (interaction_type::text::public.interaction_enum);

-- Step 6: Enable Row Level Security on the table to protect user data.
ALTER TABLE public.user_interactions ENABLE ROW LEVEL SECURITY;

-- Step 7: Recreate the necessary security policies.
CREATE POLICY "Allow users to insert their own interactions"
ON public.user_interactions FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to view interactions related to them"
ON public.user_interactions FOR SELECT
USING (auth.uid() = user_id OR auth.uid() = target_user_id);
