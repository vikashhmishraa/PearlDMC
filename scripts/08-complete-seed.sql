-- Disable foreign key checks temporarily
SET session_replication_role = replica;

-- Insert admin user credentials directly into users table
-- Note: These are placeholder records. Real auth happens via Supabase Auth
INSERT INTO users (id, email, user_type, created_at, updated_at, is_active) 
VALUES 
  ('550e8400-0000-0000-0000-000000000001', 'admin@travel.com', 'admin', NOW(), NOW(), true)
ON CONFLICT (id) DO NOTHING;

-- Insert agent users
INSERT INTO users (id, email, user_type, created_at, updated_at, is_active)
VALUES
  ('550e8400-0000-0000-0000-000000000002', 'agent1@travel.com', 'agent', NOW(), NOW(), true),
  ('550e8400-0000-0000-0000-000000000003', 'agent2@travel.com', 'agent', NOW(), NOW(), true),
  ('550e8400-0000-0000-0000-000000000004', 'agent3@travel.com', 'agent', NOW(), NOW(), true)
ON CONFLICT (id) DO NOTHING;

-- Insert agent profiles (with different statuses for testing) - NO EMAIL FIELD
INSERT INTO agent_profiles (
  id, user_id, company_name, first_name, last_name, phone, 
  city, country, status, created_at, updated_at
)
VALUES
  (
    '650e8400-0000-0000-0000-000000000001',
    '550e8400-0000-0000-0000-000000000002',
    'Paradise Travel Agency',
    'John',
    'Smith',
    '+1-555-0001',
    'Manila',
    'Philippines',
    'pending',
    NOW(),
    NOW()
  ),
  (
    '650e8400-0000-0000-0000-000000000002',
    '550e8400-0000-0000-0000-000000000003',
    'Wanderlust Travels',
    'Maria',
    'Garcia',
    '+1-555-0002',
    'Bangkok',
    'Thailand',
    'pending',
    NOW(),
    NOW()
  ),
  (
    '650e8400-0000-0000-0000-000000000003',
    '550e8400-0000-0000-0000-000000000004',
    'Global Tours Ltd',
    'Ahmed',
    'Hassan',
    '+1-555-0003',
    'Dubai',
    'UAE',
    'approved',
    NOW(),
    NOW()
  )
ON CONFLICT (id) DO NOTHING;

-- Fill remaining packages for all destinations
INSERT INTO packages (
  id, destination_id, name, description, package_type, 
  duration_days, min_group_size, max_group_size,
  price_min, price_max, currency, is_active,
  created_at, updated_at
)
VALUES
  -- South Korea packages
  ('f1234567-0000-0000-0000-000000000001', '550e8400-e29b-41d4-a716-446655440003', 'Seoul City Experience', 'Explore vibrant Seoul with modern tech and traditional hanok villages', 'cultural', 4, 1, 6, 900, 1500, 'USD', true, NOW(), NOW()),
  ('f1234567-0000-0000-0000-000000000002', '550e8400-e29b-41d4-a716-446655440003', 'Jeju Island Adventure', 'Volcanic landscapes and pristine beaches in Jeju', 'beach', 5, 2, 8, 1200, 2000, 'USD', true, NOW(), NOW()),
  
  -- Japan packages
  ('f1234567-0000-0000-0000-000000000003', '550e8400-e29b-41d4-a716-446655440004', 'Tokyo to Kyoto Journey', 'From modern Tokyo to historic Kyoto temples', 'cultural', 8, 1, 4, 2000, 3500, 'USD', true, NOW(), NOW()),
  ('f1234567-0000-0000-0000-000000000004', '550e8400-e29b-41d4-a716-446655440004', 'Mt Fuji & Lakes Tour', 'Iconic Mt Fuji and scenic lake region', 'adventure', 5, 2, 6, 1500, 2500, 'USD', true, NOW(), NOW()),
  
  -- Maldives packages  
  ('f1234567-0000-0000-0000-000000000005', '550e8400-e29b-41d4-a716-446655440005', 'Maldives Luxury Escape', 'Ultimate luxury resort experience with water activities', 'luxury', 7, 2, 4, 3500, 6000, 'USD', true, NOW(), NOW()),
  ('f1234567-0000-0000-0000-000000000006', '550e8400-e29b-41d4-a716-446655440005', 'Maldives Budget Paradise', 'Affordable local island experience', 'beach', 5, 1, 8, 1200, 2000, 'USD', true, NOW(), NOW()),
  
  -- Mauritius packages
  ('f1234567-0000-0000-0000-000000000007', '550e8400-e29b-41d4-a716-446655440007', 'Mauritius Complete Tour', 'Beaches, mountains, and cultural sites', 'beach', 7, 2, 6, 1800, 3000, 'USD', true, NOW(), NOW()),
  ('f1234567-0000-0000-0000-000000000008', '550e8400-e29b-41d4-a716-446655440007', 'Adventure in Mauritius', 'Hiking, water sports, and nature', 'adventure', 6, 2, 8, 1500, 2500, 'USD', true, NOW(), NOW()),
  
  -- South Africa packages
  ('f1234567-0000-0000-0000-000000000009', '550e8400-e29b-41d4-a716-446655440008', 'Safari & Cape Town', 'Wildlife safari and Table Mountain views', 'adventure', 10, 2, 8, 2500, 4500, 'USD', true, NOW(), NOW()),
  ('f1234567-0000-0000-0000-000000000010', '550e8400-e29b-41d4-a716-446655440008', 'Garden Route Drive', 'Scenic coastal route with stops', 'beach', 5, 1, 6, 1200, 2000, 'USD', true, NOW(), NOW()),
  
  -- Zanzibar packages
  ('f1234567-0000-0000-0000-000000000011', '550e8400-e29b-41d4-a716-446655440009', 'Stone Town & Beaches', 'Historic Stone Town and pristine beaches', 'beach', 5, 1, 6, 1000, 1800, 'USD', true, NOW(), NOW()),
  ('f1234567-0000-0000-0000-000000000012', '550e8400-e29b-41d4-a716-446655440009', 'Spice Island Tour', 'Traditional spice farms and culture', 'cultural', 4, 2, 6, 800, 1400, 'USD', true, NOW(), NOW()),
  
  -- Costa Rica packages
  ('f1234567-0000-0000-0000-000000000013', '550e8400-e29b-41d4-a716-446655440010', 'Costa Rica Adventure', 'Zip-lining, rainforests, and volcanoes', 'adventure', 8, 1, 8, 1800, 3200, 'USD', true, NOW(), NOW()),
  ('f1234567-0000-0000-0000-000000000014', '550e8400-e29b-41d4-a716-446655440010', 'Beach & Jungle Paradise', 'Pacific beaches and cloud forests', 'beach', 7, 2, 6, 1500, 2800, 'USD', true, NOW(), NOW()),
  
  -- Jamaica packages
  ('f1234567-0000-0000-0000-000000000015', '550e8400-e29b-41d4-a716-446655440011', 'Jamaica Beach Resort', 'All-inclusive resort experience', 'beach', 5, 2, 6, 1200, 2200, 'USD', true, NOW(), NOW()),
  ('f1234567-0000-0000-0000-000000000016', '550e8400-e29b-41d4-a716-446655440011', 'Reggae & Culture Tour', 'Music heritage and local culture', 'cultural', 4, 1, 8, 900, 1600, 'USD', true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Re-enable foreign key checks
SET session_replication_role = default;
