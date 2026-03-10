-- Verify and confirm RLS is completely disabled on all tables
-- Also drop all remaining policies to ensure no recursion

-- Check and report RLS status
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;

-- Disable all RLS if still enabled
ALTER TABLE IF EXISTS users DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS agent_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS destinations DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS packages DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS inquiries DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS attachments DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS activity_logs DISABLE ROW LEVEL SECURITY;

-- Drop all remaining policies just to be safe
DO $$ 
DECLARE 
    r RECORD;
BEGIN 
    FOR r IN SELECT policyname, tablename FROM pg_policies 
    LOOP 
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON ' || quote_ident(r.tablename);
    END LOOP;
END $$;

-- Verify RLS is now disabled
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;
