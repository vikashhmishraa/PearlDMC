-- Fix missing RLS INSERT policies for agent signup
-- This allows agents to create their user and agent_profile records

-- Users table: Agents can insert their own user record
CREATE POLICY "Users can create own user record" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Agent Profiles table: Agents can insert their own profile
CREATE POLICY "Agents can create own profile" ON agent_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow creation of activity logs
CREATE POLICY "Users can create activity logs for themselves" ON activity_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);
