'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAgent } from '@/contexts/agent-auth-context'
import { getAgentInquiries } from '@/lib/supabase-queries'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Package, MessageSquare, FileText, LogOut } from 'lucide-react'

export default function AgentDashboard() {
  const router = useRouter()
  const { user, profile, loading, signOut } = useAgent()
  const [inquiries, setInquiries] = useState<any[]>([])
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/agent/auth/login')
    }
  }, [loading, user, router])

  useEffect(() => {
    if (user) {
      loadInquiries()
    }
  }, [user])

  const loadInquiries = async () => {
    try {
      if (user) {
        const data = await getAgentInquiries(user.id)
        setInquiries(data || [])
      }
    } catch (error) {
      console.error('[v0] Error loading inquiries:', error)
    } finally {
      setDataLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/agent/auth/login')
    } catch (error) {
      console.error('[v0] Error signing out:', error)
    }
  }

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const statusCounts = {
    new: inquiries.filter(i => i.status === 'new').length,
    in_progress: inquiries.filter(i => i.status === 'in_progress').length,
    completed: inquiries.filter(i => i.status === 'completed').length,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold">Agent Dashboard</h1>
              <p className="text-muted-foreground mt-1">{profile?.company_name}</p>
              {profile?.status === 'pending' && (
                <Badge variant="secondary" className="mt-2">Pending Approval</Badge>
              )}
              {profile?.status === 'approved' && (
                <Badge variant="default" className="mt-2">Approved</Badge>
              )}
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {profile?.status !== 'approved' && (
          <Card className="mb-8 p-6 bg-amber-50 border-amber-200">
            <p className="text-sm text-amber-900">
              Your account is pending approval. Admin team will review your profile and contact you shortly.
            </p>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">New Inquiries</p>
                <p className="text-3xl font-bold mt-2">{statusCounts.new}</p>
              </div>
              <Package className="w-12 h-12 text-primary/20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">In Progress</p>
                <p className="text-3xl font-bold mt-2">{statusCounts.in_progress}</p>
              </div>
              <MessageSquare className="w-12 h-12 text-primary/20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Completed</p>
                <p className="text-3xl font-bold mt-2">{statusCounts.completed}</p>
              </div>
              <FileText className="w-12 h-12 text-primary/20" />
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="mb-8">
          <Link href="/agent/inquiries/new">
            <Button size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Create New Inquiry
            </Button>
          </Link>
        </div>

        {/* Inquiries Table */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Inquiries</h2>
            
            {inquiries.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No inquiries yet. Create one to get started!</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-sm">Package</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Client</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Date</th>
                      <th className="text-right py-3 px-4 font-medium text-sm">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((inquiry) => (
                      <tr key={inquiry.id} className="border-b border-border hover:bg-accent/50">
                        <td className="py-3 px-4">{inquiry.package_name}</td>
                        <td className="py-3 px-4">{inquiry.client_name}</td>
                        <td className="py-3 px-4">
                          <Badge variant={inquiry.status === 'completed' ? 'default' : 'secondary'}>
                            {inquiry.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {new Date(inquiry.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Link href={`/agent/inquiries/${inquiry.id}`}>
                            <Button variant="ghost" size="sm">View</Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  )
}
