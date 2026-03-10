import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(request: Request) {
  try {
    const adminClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    // Seed agents data
    const agentsData = [
      {
        email: 'agent1@test.com',
        password: 'TestAgent123!',
        company: 'Global Travel Agency',
        firstName: 'John',
        lastName: 'Smith',
        phone: '+1-555-0101',
        city: 'New York',
        country: 'USA',
        status: 'pending',
      },
      {
        email: 'agent2@test.com',
        password: 'TestAgent123!',
        company: 'Adventure Tours Co',
        firstName: 'Maria',
        lastName: 'Garcia',
        phone: '+1-555-0102',
        city: 'Los Angeles',
        country: 'USA',
        status: 'pending',
      },
      {
        email: 'agent3@test.com',
        password: 'TestAgent123!',
        company: 'Paradise Vacations',
        firstName: 'Ahmed',
        lastName: 'Hassan',
        phone: '+44-20-7946-0958',
        city: 'London',
        country: 'UK',
        status: 'approved',
      },
    ]

    const results = []

    for (const agentData of agentsData) {
      try {
        // Create auth user
        const { data: authUser, error: authError } = await adminClient.auth.admin.createUser({
          email: agentData.email,
          password: agentData.password,
          email_confirm: true,
        })

        if (authError) {
          console.log(`[v0] Auth user creation for ${agentData.email} returned error:`, authError)
          // Continue if user already exists
          if (authError.message.includes('already exists')) {
            results.push({ email: agentData.email, status: 'already_exists' })
            continue
          }
          throw authError
        }

        // Create user record
        const { error: userError } = await adminClient
          .from('users')
          .insert({
            id: authUser.user.id,
            email: agentData.email,
            user_type: 'agent',
            is_active: true,
          })

        if (userError && !userError.message.includes('duplicate')) {
          throw userError
        }

        // Create agent profile
        const { error: profileError } = await adminClient
          .from('agent_profiles')
          .insert({
            user_id: authUser.user.id,
            company_name: agentData.company,
            first_name: agentData.firstName,
            last_name: agentData.lastName,
            phone: agentData.phone,
            city: agentData.city,
            country: agentData.country,
            status: agentData.status,
          })

        if (profileError && !profileError.message.includes('duplicate')) {
          throw profileError
        }

        results.push({ email: agentData.email, status: 'created', userId: authUser.user.id })
      } catch (error: any) {
        console.error(`[v0] Error seeding agent ${agentData.email}:`, error)
        results.push({ email: agentData.email, status: 'error', error: error.message })
      }
    }

    return Response.json({ success: true, results }, { status: 200 })
  } catch (error: any) {
    console.error('[v0] Seed error:', error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
