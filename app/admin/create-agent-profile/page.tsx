'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface UserWithoutProfile {
  id: string
  email: string
  user_type: string
  created_at: string
}

export default function CreateAgentProfilePage() {
  const [usersWithoutProfiles, setUsersWithoutProfiles] = useState<UserWithoutProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState<string | null>(null)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    loadUsersWithoutProfiles()
  }, [])

  const loadUsersWithoutProfiles = async () => {
    try {
      setLoading(true)
      
      // Get all agent users
      const { data: agents } = await supabase
        .from('users')
        .select('id, email, user_type, created_at')
        .eq('user_type', 'agent')
      
      if (!agents) {
        setUsersWithoutProfiles([])
        return
      }

      // Get all agent profiles
      const { data: profiles } = await supabase
        .from('agent_profiles')
        .select('user_id')

      const profileUserIds = new Set((profiles || []).map(p => p.user_id))
      
      // Find users without profiles
      const usersWithout = agents.filter(agent => !profileUserIds.has(agent.id))
      
      console.log(`[v0] Found ${usersWithout.length} users without agent profiles`)
      setUsersWithoutProfiles(usersWithout)
    } catch (error) {
      console.error('[v0] Error loading users:', error)
      setMessage({ text: 'Failed to load users', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const createProfile = async (userId: string, email: string) => {
    try {
      setCreating(userId)
      const firstName = email.split('@')[0]
      
      const response = await fetch('/api/admin/create-agent-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          firstName,
          lastName: '',
          companyName: 'Agent Company',
          phone: '',
          website: '',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create profile')
      }

      setMessage({ text: `Agent profile created for ${email}`, type: 'success' })
      
      // Remove from list
      setUsersWithoutProfiles(prev => prev.filter(u => u.id !== userId))
    } catch (error: any) {
      console.error('[v0] Error creating profile:', error)
      setMessage({ text: error.message || 'Failed to create profile', type: 'error' })
    } finally {
      setCreating(null)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create Missing Agent Profiles</h1>

      {message && (
        <div className={`mb-4 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-900' : 'bg-red-50 text-red-900'}`}>
          {message.text}
        </div>
      )}

      {usersWithoutProfiles.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">All agent users have profiles! 🎉</p>
        </Card>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {usersWithoutProfiles.length} agent user(s) without profiles
          </p>
          
          {usersWithoutProfiles.map((user) => (
            <Card key={user.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{user.email}</p>
                <p className="text-sm text-muted-foreground">
                  Created: {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
              <Button
                onClick={() => createProfile(user.id, user.email)}
                disabled={creating === user.id}
              >
                {creating === user.id ? 'Creating...' : 'Create Profile'}
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
