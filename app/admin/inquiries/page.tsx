'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Mail, Phone, Eye } from 'lucide-react'
import Link from 'next/link'

interface Inquiry {
  id: string
  client_name: string
  client_email: string
  client_phone: string
  client_group_size: number
  travel_dates_from: string
  special_requirements: string
  destination_id: string
  package_id: string
  status: string
  created_at: string
  agent_id: string
  agent?: {
    company_name: string
    first_name: string
    last_name: string
  }
  destination?: {
    id: string
    name: string
    country: string
  }
  package?: {
    id: string
    name: string
    duration_days: number
    price_min: number
    price_max: number
    currency: string
  }
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'negotiating' | 'proposed' | 'confirmed' | 'rejected'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'agent'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [destinationFilter, setDestinationFilter] = useState<string>('all')
  const [destinations, setDestinations] = useState<any[]>([])

  useEffect(() => {
    loadInquiries()
  }, [])

  const loadInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      // Load agent, destination, and package info separately
      if (data && data.length > 0) {
        const agentIds = [...new Set(data.map((i: any) => i.agent_id).filter(Boolean))]
        const destIds = [...new Set(data.map((i: any) => i.destination_id).filter(Boolean))]
        const pkgIds = [...new Set(data.map((i: any) => i.package_id).filter(Boolean))]
        
        let agentMap: any = {}
        let destMap: any = {}
        let pkgMap: any = {}

        // Load agents
        if (agentIds.length > 0) {
          const { data: agentData } = await supabase
            .from('agent_profiles')
            .select('user_id, company_name, first_name, last_name')
            .in('user_id', agentIds)
          
          agentMap = (agentData || []).reduce((acc: any, agent: any) => {
            acc[agent.user_id] = agent
            return acc
          }, {})

          const missingAgentIds = agentIds.filter(id => !agentMap[id])
          if (missingAgentIds.length > 0) {
            const { data: userData } = await supabase
              .from('users')
              .select('id, email')
              .in('id', missingAgentIds)
            
            if (userData) {
              userData.forEach((user: any) => {
                agentMap[user.id] = {
                  user_id: user.id,
                  company_name: 'Agent Company',
                  first_name: user.email?.split('@')[0] || 'Agent',
                  last_name: ''
                }
              })
            }
          }
        }

        // Load destinations
        if (destIds.length > 0) {
          const { data: destData } = await supabase
            .from('destinations')
            .select('id, name, country')
            .in('id', destIds)
          
          destMap = (destData || []).reduce((acc: any, dest: any) => {
            acc[dest.id] = dest
            return acc
          }, {})
        }

        // Extract unique destinations for filter dropdown
        const uniqueDestinations = Array.from(new Map(
          (Object.values(destMap) as any[]).map(d => [d.id, d])
        ).values())
        setDestinations(uniqueDestinations)

        // Load packages
        if (pkgIds.length > 0) {
          const { data: pkgData } = await supabase
            .from('packages')
            .select('id, name, duration_days, price_min, price_max, currency')
            .in('id', pkgIds)
          
          pkgMap = (pkgData || []).reduce((acc: any, pkg: any) => {
            acc[pkg.id] = pkg
            return acc
          }, {})
        }

        const inquiriesWithDetails = data.map((inquiry: any) => ({
          ...inquiry,
          agent: agentMap[inquiry.agent_id],
          destination: destMap[inquiry.destination_id],
          package: pkgMap[inquiry.package_id]
        }))

        setInquiries(inquiriesWithDetails)
      } else {
        setInquiries(data || [])
      }
      
      setError(null)
    } catch (err: any) {
      console.error('[v0] Error loading inquiries:', err)
      setError('Unable to load inquiries')
      setInquiries([])
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      console.log('[v0] Updating status for inquiry', id, 'to', newStatus)
      
      // Validate status
      const validStatuses = ['new', 'contacted', 'negotiating', 'proposed', 'confirmed', 'rejected']
      if (!validStatuses.includes(newStatus)) {
        console.error('[v0] Invalid status:', newStatus)
        setError(`Invalid status: ${newStatus}`)
        return
      }

      const { error } = await supabase
        .from('inquiries')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error
      console.log('[v0] Status updated successfully')
      setInquiries(inquiries.map(i => i.id === id ? { ...i, status: newStatus } : i))
      setError(null)
    } catch (error: any) {
      console.error('[v0] Error updating inquiry status:', error)
      setError('Failed to update inquiry status')
    }
  }

  const filtered = inquiries.filter(i => {
    const matchesStatus = filter === 'all' ? true : i.status === filter
    const matchesDestination = destinationFilter === 'all' ? true : i.destination?.id === destinationFilter
    const matchesSearch = searchTerm === '' ? true : 
      i.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.client_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.client_phone.includes(searchTerm) ||
      i.agent?.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.agent?.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.agent?.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch && matchesDestination
  })

  const sorted = [...filtered].sort((a, b) => {
    let compareValue = 0
    
    if (sortBy === 'date') {
      compareValue = new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    } else if (sortBy === 'name') {
      compareValue = a.client_name.localeCompare(b.client_name)
    } else if (sortBy === 'agent') {
      const agentA = `${a.agent?.first_name || ''} ${a.agent?.last_name || ''}`
      const agentB = `${b.agent?.first_name || ''} ${b.agent?.last_name || ''}`
      compareValue = agentA.localeCompare(agentB)
    }
    
    return sortOrder === 'asc' ? compareValue : -compareValue
  })

  const stats = {
    new: inquiries.filter(i => i.status === 'new').length,
    contacted: inquiries.filter(i => i.status === 'contacted').length,
    negotiating: inquiries.filter(i => i.status === 'negotiating').length,
    proposed: inquiries.filter(i => i.status === 'proposed').length
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading inquiries...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Customer Inquiries</h1>
        <p className="text-muted-foreground">Manage and respond to customer inquiries</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-900">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">New</p>
          <p className="text-3xl font-bold text-blue-600">{stats.new}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Contacted</p>
          <p className="text-3xl font-bold text-yellow-600">{stats.contacted}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Negotiating</p>
          <p className="text-3xl font-bold text-purple-600">{stats.negotiating}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Proposed</p>
          <p className="text-3xl font-bold text-green-600">{stats.proposed}</p>
        </Card>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(['all', 'new', 'contacted', 'negotiating', 'proposed', 'confirmed', 'rejected'] as const).map(status => (
          <Button
            key={status}
            variant={filter === status ? 'default' : 'outline'}
            onClick={() => setFilter(status as any)}
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
            placeholder="Search by name, email, phone, or agent..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-sm"
          />
        </div>
        <div className="w-full md:w-48">
          <label className="block text-sm font-medium mb-2">Destination</label>
          <select
            value={destinationFilter}
            onChange={(e) => setDestinationFilter(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-sm"
          >
            <option value="all">All Destinations</option>
            {destinations.map(dest => (
              <option key={dest.id} value={dest.id}>{dest.name}</option>
            ))}
          </select>
        </div>
        <div className="w-full md:w-40">
          <label className="block text-sm font-medium mb-2">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-sm"
          >
            <option value="date">Date Created</option>
            <option value="name">Customer Name</option>
            <option value="agent">Agent Name</option>
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

      {sorted.length === 0 ? (
        <Card className="p-12 text-center">
          <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">No inquiries found</p>
        </Card>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Showing {sorted.length} of {inquiries.length} inquiries</p>
          {sorted.map(inquiry => (
            <Card key={inquiry.id} className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{inquiry.client_name}</h3>
                    <Badge variant="secondary">{inquiry.status}</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {inquiry.client_email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {inquiry.client_phone}
                    </div>
                  </div>
                  <p className="text-sm mb-2">Group Size: {inquiry.client_group_size} people</p>
                  <p className="text-sm mb-2">Travel Date: {new Date(inquiry.travel_dates_from).toLocaleDateString()}</p>
                  {inquiry.special_requirements && (
                    <p className="text-sm mb-2">Requirements: {inquiry.special_requirements}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Created: {new Date(inquiry.created_at).toLocaleString()}
                  </p>
                  {inquiry.agent && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-xs font-semibold text-blue-900 mb-1">Generated by Agent</p>
                        <p className="font-medium text-foreground">{inquiry.agent.company_name}</p>
                        <p className="text-sm text-muted-foreground">{inquiry.agent.first_name} {inquiry.agent.last_name}</p>
                      </div>
                    </div>
                  )}

                  {(inquiry.destination || inquiry.package) && (
                    <div className="mt-4 pt-4 border-t grid md:grid-cols-2 gap-3">
                      {inquiry.destination && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <p className="text-xs font-semibold text-green-900 mb-1">Destination</p>
                          <p className="font-medium text-foreground">{inquiry.destination.name}</p>
                          {inquiry.destination.country && (
                            <p className="text-xs text-muted-foreground">{inquiry.destination.country}</p>
                          )}
                        </div>
                      )}
                      {inquiry.package && (
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                          <p className="text-xs font-semibold text-purple-900 mb-1">Package</p>
                          <p className="font-medium text-foreground">{inquiry.package.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {inquiry.package.duration_days ? `${inquiry.package.duration_days} days` : 'N/A'}
                            {inquiry.package.price_min ? ` • ${inquiry.package.currency} ${inquiry.package.price_min}` : ''}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <select
                    value={inquiry.status}
                    onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                    className="px-3 py-2 border border-border rounded-lg bg-background text-sm"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="negotiating">Negotiating</option>
                    <option value="proposed">Proposed</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <Link href={`/admin/inquiries/${inquiry.id}`}>
                    <Button size="sm" variant="outline" className="w-full">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
