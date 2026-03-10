'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function CheckUserAgent() {
  const [email, setEmail] = useState('')
  const [userData, setUserData] = useState<any>(null)
  const [agentData, setAgentData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const checkUser = async () => {
    if (!email) {
      setError('Please enter an email')
      return
    }

    setLoading(true)
    setError('')
    setUserData(null)
    setAgentData(null)

    try {
      console.log('[v0] Checking for user:', email)
      
      // Check users table
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

      console.log('[v0] User query result:', { user, userError })

      if (userError) {
        setError(`User not found: ${userError.message}`)
        setUserData(null)
      } else {
        setUserData(user)
        console.log('[v0] User found, checking for agent profile with user_id:', user.id)

        // Check agent_profiles table
        const { data: agent, error: agentError } = await supabase
          .from('agent_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single()

        console.log('[v0] Agent query result:', { agent, agentError })

        if (agentError) {
          setError(`Agent profile not found: ${agentError.message}`)
          setAgentData(null)
        } else {
          setAgentData(agent)
        }
      }
    } catch (err: any) {
      console.error('[v0] Error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">User & Agent Profile Check</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="travelifyofficial@gmail.com"
            />
          </div>

          <Button onClick={checkUser} disabled={loading}>
            {loading ? 'Checking...' : 'Check User & Agent'}
          </Button>
        </div>
      </Card>

      {error && (
        <Card className="p-4 bg-red-50 border-red-200">
          <p className="text-red-900 font-medium">Error:</p>
          <p className="text-red-700 text-sm">{error}</p>
        </Card>
      )}

      {userData && (
        <Card className="p-6 bg-green-50 border-green-200">
          <h2 className="text-lg font-bold text-green-900 mb-4">✓ User Found</h2>
          <div className="space-y-2 text-sm">
            <p><strong>ID:</strong> {userData.id}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>User Type:</strong> {userData.user_type}</p>
            <p><strong>Created:</strong> {new Date(userData.created_at).toLocaleString()}</p>
          </div>
        </Card>
      )}

      {agentData && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h2 className="text-lg font-bold text-blue-900 mb-4">✓ Agent Profile Found</h2>
          <div className="space-y-2 text-sm">
            <p><strong>ID:</strong> {agentData.id}</p>
            <p><strong>User ID:</strong> {agentData.user_id}</p>
            <p><strong>Company:</strong> {agentData.company_name}</p>
            <p><strong>Name:</strong> {agentData.first_name} {agentData.last_name}</p>
            <p><strong>Status:</strong> {agentData.status}</p>
            <p><strong>Phone:</strong> {agentData.phone}</p>
            <p><strong>Website:</strong> {agentData.website}</p>
            <p><strong>Created:</strong> {new Date(agentData.created_at).toLocaleString()}</p>
          </div>
        </Card>
      )}

      {userData && !agentData && !error && (
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <p className="text-yellow-900 font-medium">⚠ Warning:</p>
          <p className="text-yellow-700 text-sm">User exists but no agent profile found. Agent signup may not have completed successfully.</p>
        </Card>
      )}
    </div>
  )
}
