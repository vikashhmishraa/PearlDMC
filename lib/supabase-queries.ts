import { supabase } from './supabase-client'
import { adminStore } from './admin-store'

// Destinations queries
export async function getDestinations() {
  try {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('is_active', true)
      .order('name')

    if (error) throw error
    
    // Merge with admin-created destinations
    const adminDests = adminStore.getDestinations();
    const adminCreatedDests = adminDests.filter((d: any) => d._adminAdded);
    
    return [...(data || []), ...adminCreatedDests];
  } catch (err) {
    console.error('[v0] Error fetching destinations:', err);
    // Fall back to admin-created destinations only
    return adminStore.getDestinations();
  }
}

export async function getDestinationById(id: string) {
  try {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('id', id)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    
    // Check admin store if not found in DB
    if (!data) {
      return adminStore.getDestination(id);
    }
    
    return data
  } catch (err) {
    console.error('[v0] Error fetching destination:', err);
    return adminStore.getDestination(id);
  }
}

// Packages queries
export async function getPackages(destinationId?: string) {
  try {
    let query = supabase
      .from('packages')
      .select('*')
      .eq('is_active', true)

    if (destinationId) {
      query = query.eq('destination_id', destinationId)
    }

    const { data, error } = await query.order('name')

    if (error) throw error
    
    // Get packages from admin store for this destination
    const destination = adminStore.getDestination(destinationId || '');
    const adminPackages = destination?.packages || [];
    
    return [...(data || []), ...adminPackages];
  } catch (err) {
    console.error('[v0] Error fetching packages:', err);
    // Fall back to admin packages
    const destination = adminStore.getDestination(destinationId || '');
    return destination?.packages || [];
  }
}

// Inquiries queries
export async function createInquiry(inquiryData: any) {
  const { data, error } = await supabase
    .from('inquiries')
    .insert([inquiryData])
    .select()

  if (error) throw error
  return data[0]
}

export async function getAgentInquiries(userId: string) {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .eq('agent_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function updateInquiryStatus(inquiryId: string, status: string) {
  // Validate status
  const validStatuses = ['new', 'contacted', 'negotiating', 'proposed', 'confirmed', 'rejected']
  if (!validStatuses.includes(status)) {
    throw new Error(`Invalid status: ${status}. Valid statuses are: ${validStatuses.join(', ')}`)
  }

  const { data, error } = await supabase
    .from('inquiries')
    .update({ status })
    .eq('id', inquiryId)
    .select()

  if (error) throw error
  return data[0]
}

// Messages queries - use message_text (correct column name)
export async function sendMessage(inquiryId: string, senderId: string, messageText: string) {
  const { data, error } = await supabase
    .from('messages')
    .insert([
      {
        inquiry_id: inquiryId,
        sender_id: senderId,
        message_text: messageText,
      },
    ])
    .select()

  if (error) throw error
  return data[0]
}

export async function getInquiryMessages(inquiryId: string) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('inquiry_id', inquiryId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}

// Attachments queries - use file_url (correct column name)
export async function uploadAttachment(file: File, inquiryId: string, uploadedBy: string) {
  const fileName = `${Date.now()}-${file.name}`
  const { error: uploadError } = await supabase.storage
    .from('attachments')
    .upload(`inquiries/${inquiryId}/${fileName}`, file)

  if (uploadError) throw uploadError

  const { data, error } = await supabase
    .from('attachments')
    .insert([
      {
        inquiry_id: inquiryId,
        file_name: file.name,
        file_url: `inquiries/${inquiryId}/${fileName}`,
        file_size: file.size,
        file_type: file.type,
        uploaded_by: uploadedBy,
      },
    ])
    .select()

  if (error) throw error
  return data[0]
}

export async function getInquiryAttachments(inquiryId: string) {
  const { data, error } = await supabase
    .from('attachments')
    .select('*')
    .eq('inquiry_id', inquiryId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Agent queries
export async function getAgents() {
  try {
    // First, fetch all agent profiles
    const { data: agentProfiles, error: profileError } = await supabase
      .from('agent_profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (profileError) {
      console.error('[v0] Error fetching agent profiles:', profileError)
      throw profileError
    }
    
    console.log('[v0] Agent profiles fetched:', agentProfiles?.length || 0)
    
    // Get all users with user_type = 'agent'
    const { data: agentUsers, error: usersError } = await supabase
      .from('users')
      .select('id, email, user_type, created_at')
      .eq('user_type', 'agent')
      .order('created_at', { ascending: false })
    
    if (usersError) {
      console.error('[v0] Error fetching agent users:', usersError)
      throw usersError
    }
    
    console.log('[v0] Agent users fetched:', agentUsers?.length || 0)
    
    // Create user map for quick lookup
    const userMap = (agentUsers || []).reduce((acc: any, user: any) => {
      acc[user.id] = user
      return acc
    }, {})
    
    // Create profile map
    const profileMap = (agentProfiles || []).reduce((acc: any, profile: any) => {
      acc[profile.user_id] = profile
      return acc
    }, {})
    
    // Combine agents from both agent_profiles and users tables
    const allAgentIds = new Set([
      ...(agentProfiles?.map(p => p.user_id) || []),
      ...(agentUsers?.map(u => u.id) || [])
    ])
    
    const agents = Array.from(allAgentIds)
      .map(userId => {
        const profile = profileMap[userId]
        const user = userMap[userId]
        
        return {
          id: profile?.id || userId,
          user_id: userId,
          first_name: profile?.first_name || user?.email?.split('@')[0] || 'Agent',
          last_name: profile?.last_name || '',
          company_name: profile?.company_name || 'Company',
          phone: profile?.phone || '',
          website: profile?.website || '',
          status: profile?.status || 'pending',
          users: user,
          profile_exists: !!profile,
          created_at: profile?.created_at || user?.created_at
        }
      })
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    
    console.log('[v0] Total agents (profiles + users):', agents.length)
    
    return agents
  } catch (error) {
    console.error('[v0] Error in getAgents:', error)
    throw error
  }
}

export async function updateAgentStatus(agentId: string, status: string) {
  const { data, error } = await supabase
    .from('agent_profiles')
    .update({ status, approval_date: new Date().toISOString() })
    .eq('id', agentId)
    .select()

  if (error) throw error
  return data[0]
}

export async function getAgentByEmail(email: string) {
  try {
    console.log('[v0] Searching for agent with email:', email)
    
    // First find the user by email
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, email, user_type')
      .eq('email', email)
      .single()

    if (userError) {
      console.error('[v0] User not found:', email, userError)
      return null
    }

    console.log('[v0] User found:', userData.id)

    // Then get the agent profile for this user
    const { data: agentData, error: agentError } = await supabase
      .from('agent_profiles')
      .select('*')
      .eq('user_id', userData.id)
      .single()

    if (agentError) {
      console.error('[v0] Agent profile not found for user:', userData.id, agentError)
      return null
    }

    console.log('[v0] Agent profile found:', agentData.id)
    return {
      ...agentData,
      users: userData
    }
  } catch (error) {
    console.error('[v0] Error in getAgentByEmail:', error)
    return null
  }
}
