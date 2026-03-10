-- B2B Travel Platform Database Schema
-- Phase 1: Core Tables and RLS Policies

-- 1. Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  user_type VARCHAR(20) CHECK (user_type IN ('admin', 'agent')) NOT NULL DEFAULT 'agent',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Agent Profiles
CREATE TABLE IF NOT EXISTS agent_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  company_name VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(100),
  tax_id VARCHAR(50),
  website VARCHAR(255),
  logo_url TEXT,
  bio TEXT,
  status VARCHAR(20) CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')) DEFAULT 'pending',
  approval_date TIMESTAMP,
  approved_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Destinations table
CREATE TABLE IF NOT EXISTS destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  country VARCHAR(255),
  region VARCHAR(100) CHECK (region IN ('asia-pacific', 'indian-ocean', 'africa', 'caribbean')),
  tagline TEXT,
  description TEXT,
  hero_image TEXT,
  best_time_to_visit VARCHAR(255),
  currency VARCHAR(10),
  language VARCHAR(255),
  timezone VARCHAR(50),
  highlights TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Packages table
CREATE TABLE IF NOT EXISTS packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  duration_days INTEGER,
  price_min DECIMAL(10,2),
  price_max DECIMAL(10,2),
  currency VARCHAR(10) DEFAULT 'USD',
  package_type VARCHAR(50) CHECK (package_type IN ('adventure', 'luxury', 'cultural', 'beach', 'honeymoon', 'family')),
  inclusions TEXT[],
  exclusions TEXT[],
  max_group_size INTEGER,
  min_group_size INTEGER DEFAULT 1,
  season_start_date DATE,
  season_end_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE RESTRICT,
  destination_id UUID NOT NULL REFERENCES destinations(id),
  status VARCHAR(50) CHECK (status IN ('new', 'contacted', 'negotiating', 'proposed', 'confirmed', 'rejected')) DEFAULT 'new',
  client_name VARCHAR(255),
  client_email VARCHAR(255),
  client_phone VARCHAR(20),
  client_group_size INTEGER,
  travel_dates_from DATE,
  travel_dates_to DATE,
  special_requirements TEXT,
  quote_amount DECIMAL(10,2),
  quote_currency VARCHAR(10),
  notes TEXT,
  priority VARCHAR(20) CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  assigned_to UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  closed_at TIMESTAMP
);

-- 6. Messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message_text TEXT NOT NULL,
  is_internal BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Attachments table
CREATE TABLE IF NOT EXISTS attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
  uploaded_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  file_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Activity Logs table
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(50),
  resource_id UUID,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES

-- Users: Users can only read their own user record, admins can read all
CREATE POLICY "Users can read own user record" ON users
  FOR SELECT USING (auth.uid() = id OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'admin'));

CREATE POLICY "Users can update own user record" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Agent Profiles: Agents can read and update their own profile, admins can read all
CREATE POLICY "Agents can read own profile" ON agent_profiles
  FOR SELECT USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'admin'));

CREATE POLICY "Agents can update own profile" ON agent_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can read all profiles" ON agent_profiles
  FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'admin'));

-- Destinations: Everyone can read active destinations, only admins can create/update
CREATE POLICY "Anyone can read active destinations" ON destinations
  FOR SELECT USING (is_active = true OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'admin'));

CREATE POLICY "Only admins can create destinations" ON destinations
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'admin'));

CREATE POLICY "Only admins can update destinations" ON destinations
  FOR UPDATE USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'admin'));

-- Packages: Everyone can read active packages, admins can create/update
CREATE POLICY "Anyone can read active packages" ON packages
  FOR SELECT USING (is_active = true OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'admin'));

CREATE POLICY "Only admins can create packages" ON packages
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'admin'));

CREATE POLICY "Only admins can update packages" ON packages
  FOR UPDATE USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'admin'));

-- Inquiries: Agents can see their own inquiries, admins can see all
CREATE POLICY "Agents can read own inquiries" ON inquiries
  FOR SELECT USING (auth.uid() = agent_id OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'admin'));

CREATE POLICY "Agents can create inquiries" ON inquiries
  FOR INSERT WITH CHECK (auth.uid() = agent_id);

CREATE POLICY "Agents can update own inquiries" ON inquiries
  FOR UPDATE USING (auth.uid() = agent_id OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'admin'));

-- Messages: Users can read messages for their inquiries
CREATE POLICY "Users can read messages for their inquiries" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM inquiries 
      WHERE inquiries.id = inquiry_id 
      AND (inquiries.agent_id = auth.uid() OR EXISTS (
        SELECT 1 FROM users WHERE users.id = auth.uid() AND user_type = 'admin'
      ))
    )
  );

CREATE POLICY "Users can create messages for their inquiries" ON messages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM inquiries 
      WHERE inquiries.id = inquiry_id 
      AND (inquiries.agent_id = auth.uid() OR EXISTS (
        SELECT 1 FROM users WHERE users.id = auth.uid() AND user_type = 'admin'
      ))
    ) AND auth.uid() = sender_id
  );

-- Attachments: Similar to messages
CREATE POLICY "Users can read attachments for their inquiries" ON attachments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM inquiries 
      WHERE inquiries.id = inquiry_id 
      AND (inquiries.agent_id = auth.uid() OR EXISTS (
        SELECT 1 FROM users WHERE users.id = auth.uid() AND user_type = 'admin'
      ))
    )
  );

CREATE POLICY "Users can upload attachments for their inquiries" ON attachments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM inquiries 
      WHERE inquiries.id = inquiry_id 
      AND inquiries.agent_id = auth.uid()
    ) AND auth.uid() = uploaded_by
  );

-- Activity Logs: Users can read their own logs, admins can read all
CREATE POLICY "Users can read own activity logs" ON activity_logs
  FOR SELECT USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'admin'));

CREATE POLICY "Anyone can create activity logs" ON activity_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_users_user_type ON users(user_type);
CREATE INDEX idx_agent_profiles_status ON agent_profiles(status);
CREATE INDEX idx_inquiries_agent_id ON inquiries(agent_id);
CREATE INDEX idx_inquiries_package_id ON inquiries(package_id);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_messages_inquiry_id ON messages(inquiry_id);
CREATE INDEX idx_attachments_inquiry_id ON attachments(inquiry_id);
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
