'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function UserAgentProfileCheck() {
  const [users, setUsers] = useState<any[]>([])
  const [agents, setAgents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      // Load all users
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (usersError) throw usersError
      console.log('[v0] Users fetched:', usersData?.length || 0)
      setUsers(usersData || [])

      // Load all agent profiles
      const { data: agentsData, error: agentsError } = await supabase
        .from('agent_profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (agentsError) throw agentsError
      console.log('[v0] Agent profiles fetched:', agentsData?.length || 0)
      setAgents(agentsData || [])
    } catch (error) {
      console.error('[v0] Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">User & Agent Profile Audit</h1>
        <p className="text-muted-foreground mb-6">Check all users and agent profiles in the database</p>
      </div>

      {/* Users Section */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Users ({users.length})</h2>
        {users.length === 0 ? (
          <p className="text-muted-foreground">No users found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-2 px-2">ID</th>
                  <th className="text-left py-2 px-2">Email</th>
                  <th className="text-left py-2 px-2">User Type</th>
                  <th className="text-left py-2 px-2">Active</th>
                  <th className="text-left py-2 px-2">Created</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-accent">
                    <td className="py-2 px-2 font-mono text-xs">{user.id.slice(0, 8)}...</td>
                    <td className="py-2 px-2 break-all">{user.email}</td>
                    <td className="py-2 px-2">{user.user_type || '-'}</td>
                    <td className="py-2 px-2">{user.is_active ? '✓' : '✗'}</td>
                    <td className="py-2 px-2 text-xs">{new Date(user.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Agent Profiles Section */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Agent Profiles ({agents.length})</h2>
        {agents.length === 0 ? (
          <p className="text-muted-foreground">No agent profiles found</p>
        ) : (
          <div className="space-y-4">
            {agents.map((agent) => {
              const linkedUser = users.find(u => u.id === agent.user_id)
              return (
                <Card key={agent.id} className="p-4 border">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Profile ID</p>
                      <p className="font-mono text-xs">{agent.id.slice(0, 8)}...</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">User ID</p>
                      <p className="font-mono text-xs">{agent.user_id.slice(0, 8)}...</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Name</p>
                      <p className="font-medium">{agent.first_name} {agent.last_name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Company</p>
                      <p className="font-medium">{agent.company_name}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground text-xs">Linked User Email</p>
                      <p className={`font-medium ${linkedUser ? 'text-green-600' : 'text-red-600'}`}>
                        {linkedUser?.email || '❌ NO USER FOUND'}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Status</p>
                      <p className="font-medium">{agent.status}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Created</p>
                      <p className="text-xs">{new Date(agent.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </Card>

      <Button onClick={loadData}>Refresh Data</Button>
    </div>
  )
}
