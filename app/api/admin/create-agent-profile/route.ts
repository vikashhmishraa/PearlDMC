import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export async function POST(request: NextRequest) {
  try {
    const { userId, firstName, lastName, companyName, phone, website } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    // Check if user exists
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if agent profile already exists
    const { data: existingProfile } = await supabaseAdmin
      .from('agent_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (existingProfile) {
      return NextResponse.json({ error: 'Agent profile already exists', profile: existingProfile }, { status: 409 })
    }

    // Create agent profile
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('agent_profiles')
      .insert({
        user_id: userId,
        first_name: firstName || user.email?.split('@')[0] || 'Agent',
        last_name: lastName || '',
        company_name: companyName || 'Company',
        phone: phone || '',
        website: website || '',
        status: 'pending',
      })
      .select()

    if (profileError) {
      console.error('[v0] Profile creation error:', profileError)
      return NextResponse.json({ error: 'Failed to create agent profile', details: profileError }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      profile: profile?.[0],
      message: `Agent profile created for user ${user.email}`
    })
  } catch (error: any) {
    console.error('[v0] Error in create-agent-profile:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
