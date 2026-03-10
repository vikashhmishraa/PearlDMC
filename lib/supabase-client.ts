import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to get authenticated user
export async function getCurrentUser() {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error('[v0] Error getting current user:', error)
    return null
  }
}

// Helper function to sign out
export async function signOut() {
  try {
    await supabase.auth.signOut()
  } catch (error) {
    console.error('[v0] Error signing out:', error)
  }
}
