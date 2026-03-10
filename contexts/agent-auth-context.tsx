'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase-client'

interface AgentProfile {
  id: string
  user_id: string
  company_name: string
  phone: string
  website: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

interface AgentContextType {
  user: User | null
  profile: AgentProfile | null
  loading: boolean
  signUp: (email: string, password: string, agentData: any) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AgentContext = createContext<AgentContextType | undefined>(undefined)

export function AgentProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<AgentProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Only run on client side
    const initAuth = async () => {
      try {
        // Check if user is logged in
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)

        if (session?.user) {
          // Fetch agent profile
          const { data } = await supabase
            .from('agent_profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .single()

          setProfile(data as AgentProfile)
        } else {
          setProfile(null)
        }

        // Set up listener for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          setUser(session?.user ?? null)

          if (session?.user) {
            // Fetch agent profile
            const { data } = await supabase
              .from('agent_profiles')
              .select('*')
              .eq('user_id', session.user.id)
              .single()

            setProfile(data as AgentProfile)
          } else {
            setProfile(null)
          }
        })

        setLoading(false)
        return () => subscription?.unsubscribe()
      } catch (error) {
        console.error('[v0] Auth initialization error:', error)
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const signUp = async (email: string, password: string, agentData: any) => {
    try {
      console.log('[v0] Starting agent signup for:', email)
      console.log('[v0] Agent data:', agentData)

      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) throw authError

      if (data.user) {
        console.log('[v0] Auth user created:', data.user.id)

        // Create user record first (required for foreign key constraint)
        const { error: userError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: email,
            user_type: 'agent',
            is_active: true,
          })

        if (userError) {
          console.error('[v0] User creation error:', userError)
          throw userError
        }

        console.log('[v0] User record created')

        // Prepare agent profile data from form
        const profileData = {
          first_name: agentData?.first_name || email.split('@')[0],
          last_name: agentData?.last_name || '',
          company_name: agentData?.company_name || 'Agent Company',
          phone: agentData?.phone || '',
          website: agentData?.website || '',
          status: 'pending',
        }

        console.log('[v0] Profile data to save:', profileData)

        // Wait a bit for the trigger to possibly fire
        await new Promise(r => setTimeout(r, 1000))

        // Check if profile already exists (from trigger)
        const { data: existingProfile } = await supabase
          .from('agent_profiles')
          .select('id')
          .eq('user_id', data.user.id)
          .single()

        if (existingProfile) {
          console.log('[v0] Profile exists from trigger, updating with form data:', existingProfile.id)

          // Update the profile with actual form data
          const { error: updateError } = await supabase
            .from('agent_profiles')
            .update(profileData)
            .eq('id', existingProfile.id)

          if (updateError) {
            console.error('[v0] Profile update failed:', updateError)
            throw new Error(`Failed to update agent profile: ${updateError.message}`)
          }

          console.log('[v0] Agent profile updated with form data')
          return
        }

        console.log('[v0] Trigger did not create profile, creating manually...')

        // Create agent profile if trigger didn't
        const { data: profileResult, error: profileError } = await supabase
          .from('agent_profiles')
          .insert([{ user_id: data.user.id, ...profileData }])
          .select()

        if (profileError) {
          console.error('[v0] Profile creation failed:', profileError)
          throw new Error(`Failed to create agent profile: ${profileError.message}`)
        }

        console.log('[v0] Agent profile created successfully:', profileResult?.[0]?.id)
      }
    } catch (error: any) {
      console.error('[v0] Signup error:', error)
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return (
    <AgentContext.Provider value={{ user, profile, loading, signUp, signIn, signOut }}>
      {children}
    </AgentContext.Provider>
  )
}

export function useAgent(): AgentContextType {
  const context = useContext(AgentContext)
  if (!context) {
    // Provide default values during build/SSR
    return {
      user: null,
      profile: null,
      loading: false,
      signUp: async () => { throw new Error('Agent context not available') },
      signIn: async () => { throw new Error('Agent context not available') },
      signOut: async () => { throw new Error('Agent context not available') },
    }
  }
  return context
}
