'use client'

import { useEffect, useState } from 'react'
import { getAgents, updateAgentStatus } from '@/lib/supabase-queries'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Clock, Users } from 'lucide-react'

export default function AdminAgentsPage() {
  const [agents, setAgents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'company' | 'date'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    loadAgents()
  }, [])

  const loadAgents = async () => {
    try {
      setError(null)
      console.log('[v0] Loading agents...')
      const data = await getAgents()
      console.log('[v0] Agents loaded:', data?.length || 0)
      setAgents(data || [])
    } catch (err) {
      console.error('[v0] Error loading agents:', err)
      setError('Failed to load agents')
    } finally {
      setLoading(false)
    }
  }

  const handleApproveAgent = async (agentId: string) => {
    try {
      await updateAgentStatus(agentId, 'approved')
      setAgents(agents.map(a => a.id === agentId ? { ...a, status: 'approved' } : a))
    } catch (error) {
      console.error('[v0] Error approving agent:', error)
      alert('Failed to approve agent')
    }
  }

  const handleRejectAgent = async (agentId: string) => {
    try {
      await updateAgentStatus(agentId, 'rejected')
      setAgents(agents.map(a => a.id === agentId ? { ...a, status: 'rejected' } : a))
    } catch (error) {
      console.error('[v0] Error rejecting agent:', error)
      alert('Failed to reject agent')
    }
  }

  const statuses = {
    pending: agents.filter(a => a.status === 'pending').length,
    approved: agents.filter(a => a.status === 'approved').length,
    rejected: agents.filter(a => a.status === 'rejected').length,
  }

  const filtered = agents.filter(a => {
    const matchesStatus = statusFilter === 'all' ? true : a.status === statusFilter
    const matchesSearch = searchTerm === '' ? true :
      a.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.phone.includes(searchTerm) ||
      a.users?.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const sorted = [...filtered].sort((a, b) => {
    let compareValue = 0
    
    if (sortBy === 'name') {
      compareValue = `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`)
    } else if (sortBy === 'company') {
      compareValue = a.company_name.localeCompare(b.company_name)
    } else if (sortBy === 'date') {
      compareValue = new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    }
    
    return sortOrder === 'asc' ? compareValue : -compareValue
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading agents...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Manage Agents</h1>
        <p className="text-muted-foreground">Review and approve travel agency agents</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-900">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Pending</p>
              <p className="text-3xl font-bold mt-2">{statuses.pending}</p>
            </div>
            <div className="text-amber-500 opacity-20">
              <Clock className="w-12 h-12" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Approved</p>
              <p className="text-3xl font-bold mt-2">{statuses.approved}</p>
            </div>
            <div className="text-green-500 opacity-20">
              <CheckCircle className="w-12 h-12" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Rejected</p>
              <p className="text-3xl font-bold mt-2">{statuses.rejected}</p>
            </div>
            <div className="text-red-500 opacity-20">
              <XCircle className="w-12 h-12" />
            </div>
          </div>
        </Card>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(['all', 'pending', 'approved', 'rejected'] as const).map(status => (
          <Button
            key={status}
            variant={statusFilter === status ? 'default' : 'outline'}
            onClick={() => setStatusFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Search</label>
          <input
            type="text"
            placeholder="Search by name, company, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-sm"
          />
        </div>
        <div className="w-full md:w-40">
          <label className="block text-sm font-medium mb-2">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-sm"
          >
            <option value="date">Date Created</option>
            <option value="name">Agent Name</option>
            <option value="company">Company Name</option>
          </select>
        </div>
        <div className="w-full md:w-32">
          <label className="block text-sm font-medium mb-2">Order</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-sm"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {sorted.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="text-muted-foreground opacity-50 mx-auto mb-4 flex justify-center">
              <Users className="w-12 h-12" />
            </div>
            <p className="text-muted-foreground">No agents found</p>
          </Card>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">Showing {sorted.length} of {agents.length} agents</p>
            <div className="space-y-4">
              {sorted.map(agent => (
            <Card key={agent.id} className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{agent.company_name}</h3>
                    <Badge
                      variant={
                        agent.status === 'approved'
                          ? 'default'
                          : agent.status === 'rejected'
                            ? 'destructive'
                            : 'secondary'
                      }
                    >
                      {agent.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {agent.first_name} {agent.last_name}
                  </p>
                  {agent.phone && (
                    <p className="text-sm text-muted-foreground">{agent.phone}</p>
                  )}
                  {agent.users?.email && (
                    <p className="text-sm text-muted-foreground">{agent.users.email}</p>
                  )}
                  {agent.city && agent.country && (
                    <p className="text-sm text-muted-foreground">
                      {agent.city}, {agent.country}
                    </p>
                  )}
                </div>

                {agent.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleApproveAgent(agent.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRejectAgent(agent.id)}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
