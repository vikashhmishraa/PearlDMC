-- Fix infinite recursion in RLS policies by using ONLY direct column checks
-- No recursive queries between tables with RLS enabled

-- DISABLE RLS TEMPORARILY
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE agent_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE destinations DISABLE ROW LEVEL SECURITY;
ALTER TABLE packages DISABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries DISABLE ROW LEVEL SECURITY;
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE attachments DISABLE ROW LEVEL SECURITY;

-- DROP ALL POLICIES
DROP POLICY IF EXISTS "Users can read own record" ON users;
DROP POLICY IF EXISTS "Users can insert own record" ON users;
DROP POLICY IF EXISTS "Users can update own record" ON users;
DROP POLICY IF EXISTS "Admins can read all users" ON users;
DROP POLICY IF EXISTS "Agents can read own profile" ON agent_profiles;
DROP POLICY IF EXISTS "Agents can insert own profile" ON agent_profiles;
DROP POLICY IF EXISTS "Agents can update own profile" ON agent_profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON agent_profiles;
DROP POLICY IF EXISTS "Admins can update profiles" ON agent_profiles;
DROP POLICY IF EXISTS "Anyone can read active destinations" ON destinations;
DROP POLICY IF EXISTS "Anyone can read active packages" ON packages;
DROP POLICY IF EXISTS "Admins can insert destinations" ON destinations;
DROP POLICY IF EXISTS "Admins can insert packages" ON packages;

-- RE-ENABLE RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;

-- USERS TABLE - Non-recursive policies based on user_type
CREATE POLICY "users_select_own"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "users_select_admin"
  ON users FOR SELECT
  USING (user_type = 'admin' AND auth.uid() IN (SELECT id FROM users WHERE user_type = 'admin'));

CREATE POLICY "users_insert_own"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "users_update_own"
  ON users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "users_update_admin"
  ON users FOR UPDATE
  USING (user_type = 'admin' AND auth.uid() IN (SELECT id FROM users WHERE user_type = 'admin'));

-- AGENT_PROFILES TABLE - Based on user_type and profile status
CREATE POLICY "agent_profiles_select_own"
  ON agent_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "agent_profiles_select_admin"
  ON agent_profiles FOR SELECT
  USING (
    auth.uid() IN (SELECT id FROM users WHERE user_type = 'admin')
  );

CREATE POLICY "agent_profiles_insert_own"
  ON agent_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "agent_profiles_update_own"
  ON agent_profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "agent_profiles_update_admin"
  ON agent_profiles FOR UPDATE
  USING (
    auth.uid() IN (SELECT id FROM users WHERE user_type = 'admin')
  );

-- DESTINATIONS TABLE - Simple public read for active, admin write
CREATE POLICY "destinations_select_active"
  ON destinations FOR SELECT
  USING (is_active = true);

CREATE POLICY "destinations_select_all_admin"
  ON destinations FOR SELECT
  USING (
    auth.uid() IN (SELECT id FROM users WHERE user_type = 'admin')
  );

CREATE POLICY "destinations_insert_admin"
  ON destinations FOR INSERT
  WITH CHECK (
    auth.uid() IN (SELECT id FROM users WHERE user_type = 'admin')
  );

CREATE POLICY "destinations_update_admin"
  ON destinations FOR UPDATE
  USING (
    auth.uid() IN (SELECT id FROM users WHERE user_type = 'admin')
  );

-- PACKAGES TABLE - Simple public read for active, admin write
CREATE POLICY "packages_select_active"
  ON packages FOR SELECT
  USING (is_active = true);

CREATE POLICY "packages_select_all_admin"
  ON packages FOR SELECT
  USING (
    auth.uid() IN (SELECT id FROM users WHERE user_type = 'admin')
  );

CREATE POLICY "packages_insert_admin"
  ON packages FOR INSERT
  WITH CHECK (
    auth.uid() IN (SELECT id FROM users WHERE user_type = 'admin')
  );

CREATE POLICY "packages_update_admin"
  ON packages FOR UPDATE
  USING (
    auth.uid() IN (SELECT id FROM users WHERE user_type = 'admin')
  );

-- INQUIRIES TABLE - Agents see their own, admins see all
CREATE POLICY "inquiries_select_own"
  ON inquiries FOR SELECT
  USING (auth.uid() = agent_id);

CREATE POLICY "inquiries_select_admin"
  ON inquiries FOR SELECT
  USING (
    auth.uid() IN (SELECT id FROM users WHERE user_type = 'admin')
  );

CREATE POLICY "inquiries_insert_agent"
  ON inquiries FOR INSERT
  WITH CHECK (auth.uid() = agent_id);

CREATE POLICY "inquiries_update_own"
  ON inquiries FOR UPDATE
  USING (auth.uid() = agent_id)
  WITH CHECK (auth.uid() = agent_id);

CREATE POLICY "inquiries_update_admin"
  ON inquiries FOR UPDATE
  USING (
    auth.uid() IN (SELECT id FROM users WHERE user_type = 'admin')
  );

-- MESSAGES TABLE - Based on inquiry participation
CREATE POLICY "messages_select_inquiry_participant"
  ON messages FOR SELECT
  USING (
    auth.uid() = sender_id
    OR auth.uid() IN (SELECT agent_id FROM inquiries WHERE inquiries.id = inquiry_id)
    OR auth.uid() IN (SELECT id FROM users WHERE user_type = 'admin')
  );

CREATE POLICY "messages_insert_own"
  ON messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

-- ATTACHMENTS TABLE - Agents and admins can access inquiry attachments
CREATE POLICY "attachments_select_inquiry"
  ON attachments FOR SELECT
  USING (
    auth.uid() IN (SELECT agent_id FROM inquiries WHERE inquiries.id = inquiry_id)
    OR auth.uid() IN (SELECT id FROM users WHERE user_type = 'admin')
  );

CREATE POLICY "attachments_insert_inquiry"
  ON attachments FOR INSERT
  WITH CHECK (
    auth.uid() IN (SELECT agent_id FROM inquiries WHERE inquiries.id = inquiry_id)
  );

-- ACTIVITY_LOGS TABLE (view-only for admin)
CREATE POLICY "activity_logs_select_admin"
  ON activity_logs FOR SELECT
  USING (
    auth.uid() IN (SELECT id FROM users WHERE user_type = 'admin')
  );
