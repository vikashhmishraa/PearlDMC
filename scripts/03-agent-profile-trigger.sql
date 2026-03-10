-- Create a trigger to automatically create agent_profiles when a user with user_type='agent' is created
CREATE OR REPLACE FUNCTION create_agent_profile_on_user_insert()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.user_type = 'agent' THEN
    INSERT INTO agent_profiles (
      user_id,
      first_name,
      last_name,
      company_name,
      status,
      created_at
    ) VALUES (
      NEW.id,
      COALESCE(NEW.email, '')::text,
      '',
      'Company',
      'pending',
      NOW()
    ) ON CONFLICT (user_id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS trigger_create_agent_profile ON users;

-- Create the trigger
CREATE TRIGGER trigger_create_agent_profile
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION create_agent_profile_on_user_insert();
