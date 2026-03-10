-- Insert test admin user for authentication
INSERT INTO users (id, email, user_type, is_active) 
VALUES (
  'f0000000-0000-0000-0000-000000000001', 
  'admin@example.com', 
  'admin', 
  true
) ON CONFLICT DO NOTHING;

-- Insert test agent users
INSERT INTO users (id, email, user_type, is_active) 
VALUES 
  ('f0000000-0000-0000-0000-000000000002', 'agent1@example.com', 'agent', true),
  ('f0000000-0000-0000-0000-000000000003', 'agent2@example.com', 'agent', true),
  ('f0000000-0000-0000-0000-000000000004', 'agent3@example.com', 'agent', true)
ON CONFLICT DO NOTHING;

-- Insert test agent profiles
INSERT INTO agent_profiles (user_id, company_name, first_name, last_name, phone, city, country, status)
VALUES 
  ('f0000000-0000-0000-0000-000000000002', 'Global Travel Agency', 'John', 'Smith', '+1-555-0101', 'New York', 'USA', 'pending'),
  ('f0000000-0000-0000-0000-000000000003', 'Adventure Tours Co', 'Maria', 'Garcia', '+1-555-0102', 'Los Angeles', 'USA', 'pending'),
  ('f0000000-0000-0000-0000-000000000004', 'Paradise Vacations', 'Ahmed', 'Hassan', '+44-20-7946-0958', 'London', 'UK', 'approved')
ON CONFLICT DO NOTHING;
