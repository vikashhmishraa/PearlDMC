-- Seed destinations with actual data
INSERT INTO destinations (id, name, country, region, tagline, description, hero_image, best_time_to_visit, currency, language, timezone, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440001'::uuid, 'Philippines', 'Philippines', 'asia-pacific', '7,641 Islands of Paradise', 'The Philippines is a tropical paradise featuring stunning beaches, vibrant culture, and world-class diving.', '/images/philippines-hero.jpg', 'November - April', 'PHP', 'Filipino, English', 'PST', true),
('550e8400-e29b-41d4-a716-446655440002'::uuid, 'Bali', 'Indonesia', 'asia-pacific', 'Island of the Gods', 'Bali offers pristine beaches, ancient temples, rice terraces, and vibrant nightlife in a culturally rich setting.', '/images/bali.jpg', 'April - October', 'IDR', 'Indonesian, English', 'WITA', true),
('550e8400-e29b-41d4-a716-446655440003'::uuid, 'Japan', 'Japan', 'asia-pacific', 'Land of the Rising Sun', 'Experience Japan''s perfect blend of ancient traditions and cutting-edge technology across Tokyo, Kyoto, and beyond.', '/images/japan.jpg', 'March - May, September - November', 'JPY', 'Japanese', 'JST', true),
('550e8400-e29b-41d4-a716-446655440004'::uuid, 'South Korea', 'South Korea', 'asia-pacific', 'Dynamic K-Culture Hub', 'Discover modern Seoul, historic sites, K-pop culture, and delicious cuisine in this vibrant East Asian destination.', '/images/south-korea.jpg', 'April - May, September - October', 'KRW', 'Korean', 'KST', true),
('550e8400-e29b-41d4-a716-446655440005'::uuid, 'Maldives', 'Maldives', 'indian-ocean', 'Luxury Overwater Paradise', 'The Maldives epitomizes tropical luxury with pristine atolls, crystal waters, and world-class resorts.', '/images/maldives.jpg', 'November - April', 'MVR', 'Dhivehi, English', 'MVT', true),
('550e8400-e29b-41d4-a716-446655440006'::uuid, 'Mauritius', 'Mauritius', 'indian-ocean', 'Island of Wonders', 'Mauritius combines beach beauty, multicultural experiences, and adventure activities in the Indian Ocean.', '/images/mauritius.jpg', 'October - April', 'MUR', 'English, French', 'MUT', true),
('550e8400-e29b-41d4-a716-446655440007'::uuid, 'South Africa', 'South Africa', 'africa', 'A World in One Country', 'From safaris to Table Mountain, South Africa offers diverse experiences in stunning natural settings.', '/images/south-africa.jpg', 'November - February', 'ZAR', 'English, Afrikaans', 'SAST', true),
('550e8400-e29b-41d4-a716-446655440008'::uuid, 'Zanzibar', 'Tanzania', 'africa', 'Spice Island Magic', 'Zanzibar blends history, culture, and natural beauty with its historic Stone Town and pristine beaches.', '/images/zanzibar.jpg', 'June - October', 'TZS', 'Swahili, English', 'EAT', true),
('550e8400-e29b-41d4-a716-446655440009'::uuid, 'Costa Rica', 'Costa Rica', 'caribbean', 'Eco-Paradise of Central America', 'Costa Rica is perfect for eco-tourism with rainforests, wildlife, and adventure activities.', '/images/costa-rica.jpg', 'December - April', 'CRC', 'Spanish, English', 'CST', true),
('550e8400-e29b-41d4-a716-446655440010'::uuid, 'Jamaica', 'Jamaica', 'caribbean', 'One Love Island', 'Jamaica offers beautiful beaches, reggae culture, waterfalls, and warm Caribbean hospitality.', '/images/jamaica.jpg', 'November - mid-December, mid-January - March', 'JMD', 'English', 'EST', true);

-- Seed packages
INSERT INTO packages (destination_id, name, description, duration_days, price_min, price_max, currency, package_type, max_group_size, min_group_size, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440001'::uuid, 'Palawan Paradise', 'Explore the stunning Palawan islands with island hopping and beach relaxation', 7, 1500, 2500, 'USD', 'beach', 6, 2, true),
('550e8400-e29b-41d4-a716-446655440001'::uuid, 'Boracay Beach Escape', 'Enjoy pristine beaches and water sports in Boracay', 5, 1200, 1800, 'USD', 'beach', 8, 2, true),
('550e8400-e29b-41d4-a716-446655440001'::uuid, 'Filipino Adventure', 'Diving, trekking, and cultural experiences across islands', 10, 2000, 3500, 'USD', 'adventure', 6, 1, true),

('550e8400-e29b-41d4-a716-446655440002'::uuid, 'Ubud Cultural Tour', 'Temples, rice terraces, and traditional arts of Ubud', 6, 1000, 1600, 'USD', 'cultural', 4, 1, true),
('550e8400-e29b-41d4-a716-446655440002'::uuid, 'Seminyak Luxury Retreat', 'Beachfront luxury resorts and sunset dining in Seminyak', 5, 1800, 2800, 'USD', 'luxury', 4, 2, true),

('550e8400-e29b-41d4-a716-446655440003'::uuid, 'Tokyo Modern Experience', 'Tech, culture, and cuisine in Japan''s capital', 6, 2000, 3200, 'USD', 'cultural', 4, 2, true),
('550e8400-e29b-41d4-a716-446655440003'::uuid, 'Kyoto Tradition Tour', 'Ancient temples and traditional Japanese culture', 5, 1500, 2400, 'USD', 'cultural', 4, 1, true),

('550e8400-e29b-41d4-a716-446655440005'::uuid, 'Maldives Honeymoon', 'Romantic overwater bungalows and sunset cruises', 7, 3500, 6000, 'USD', 'honeymoon', 2, 2, true),
('550e8400-e29b-41d4-a716-446655440005'::uuid, 'Maldives Diving Adventure', 'World-class diving and snorkeling in pristine waters', 8, 2500, 4500, 'USD', 'adventure', 4, 2, true),

('550e8400-e29b-41d4-a716-446655440007'::uuid, 'African Safari', 'Big Five safari experience and wildlife viewing', 10, 4000, 7000, 'USD', 'adventure', 6, 2, true),
('550e8400-e29b-41d4-a716-446655440007'::uuid, 'Cape Town & Wine', 'Table Mountain, wine estates, and coastal beauty', 6, 1800, 3000, 'USD', 'luxury', 4, 2, true),

('550e8400-e29b-41d4-a716-446655440009'::uuid, 'Costa Rica Eco Adventure', 'Rainforest hikes, wildlife, and zip-lining', 8, 1600, 2800, 'USD', 'adventure', 6, 2, true),
('550e8400-e29b-41d4-a716-446655440009'::uuid, 'Costa Rica Family Fun', 'Beaches, wildlife parks, and family-friendly activities', 7, 1400, 2400, 'USD', 'family', 8, 3, true);
