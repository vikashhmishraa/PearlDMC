import { supabase } from '@/lib/supabase-client'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    // Get all agent profiles with their user data
    const { data: profiles, error: profileError } = await supabase
      .from('agent_profiles')
      .select('*')

    if (profileError) {
      return NextResponse.json({
        error: 'Error fetching agent_profiles',
        details: profileError
      }, { status: 500 })
    }

    // Get all users  
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .eq('user_type', 'agent')

    if (usersError) {
      return NextResponse.json({
        error: 'Error fetching users',
        details: usersError
      }, { status: 500 })
    }

    // Get all auth users
    const { data: { users: authUsers }, error: authError } = await supabase.auth.admin.listUsers()

    if (authError) {
      return NextResponse.json({
        error: 'Error fetching auth users',
        details: authError
      }, { status: 500 })
    }

    return NextResponse.json({
      agent_profiles_count: profiles?.length || 0,
      agent_profiles: profiles,
      agent_users_count: users?.length || 0,
      agent_users: users,
      auth_users_count: authUsers?.length || 0,
      auth_users: authUsers?.map((u: any) => ({
        id: u.id,
        email: u.email,
        created_at: u.created_at
      }))
    })
  } catch (error) {
    console.error('[v0] Debug error:', error)
    return NextResponse.json({
      error: 'Internal server error',
      details: error
    }, { status: 500 })
  }
}
