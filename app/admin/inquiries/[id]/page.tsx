'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase-client'
import { getInquiryMessages, getInquiryAttachments, sendMessage } from '@/lib/supabase-queries'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Download, Send } from 'lucide-react'

// System admin ID - this is a fixed UUID for admin messages
const SYSTEM_ADMIN_ID = '550e8400-0000-0000-0000-000000000001'

export default function AdminInquiryDetail() {
  const params = useParams()
  const inquiryId = params.id as string
  const [inquiry, setInquiry] = useState<any>(null)
  const [agent, setAgent] = useState<any>(null)
  const [destination, setDestination] = useState<any>(null)
  const [package_, setPackage] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [attachments, setAttachments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [messageText, setMessageText] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (inquiryId) {
      loadData()
    }
  }, [inquiryId])

  const loadData = async () => {
    try {
      const { data: inquiryData } = await supabase
        .from('inquiries')
        .select('*')
        .eq('id', inquiryId)
        .single()

      setInquiry(inquiryData)

      // Load agent info
      if (inquiryData?.agent_id) {
        const { data: agentData } = await supabase
          .from('agent_profiles')
          .select('*')
          .eq('user_id', inquiryData.agent_id)
          .single()

        setAgent(agentData)
      }

      // Load destination info
      if (inquiryData?.destination_id) {
        const { data: destData } = await supabase
          .from('destinations')
          .select('*')
          .eq('id', inquiryData.destination_id)
          .single()

        setDestination(destData)
      }

      // Load package info
      if (inquiryData?.package_id) {
        const { data: pkgData } = await supabase
          .from('packages')
          .select('*')
          .eq('id', inquiryData.package_id)
          .single()

        setPackage(pkgData)
      }

      const msgData = await getInquiryMessages(inquiryId)
      setMessages(msgData || [])
      const attachData = await getInquiryAttachments(inquiryId)
      setAttachments(attachData || [])
    } catch (error) {
      console.error('[v0] Error loading inquiry:', error)
      setError('Failed to load inquiry details')
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!messageText.trim()) return

    setSending(true)
    try {
      const newMessage = await sendMessage(inquiryId, SYSTEM_ADMIN_ID, messageText)
      setMessages([...messages, newMessage])
      setMessageText('')
      setError(null)
    } catch (error: any) {
      console.error('[v0] Error sending message:', error)
      setError('Failed to send message')
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading inquiry details...</p>
      </div>
    )
  }
  if (!inquiry) return <div className="flex items-center justify-center min-h-screen">Inquiry not found</div>

  return (
    <div className="space-y-6">
      <Link href="/admin/inquiries" className="flex items-center gap-2 text-primary">
        <ArrowLeft className="w-4 h-4" />
        Back to Inquiries
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-900 text-sm">
              {error}
            </div>
          )}

          {/* Inquiry Details */}
          <Card className="p-6">
            <h1 className="text-3xl font-serif font-bold mb-4">Customer Inquiry</h1>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{inquiry.client_name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium break-all">{inquiry.client_email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{inquiry.client_phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Group Size</p>
                <p className="font-medium">{inquiry.client_group_size}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Travel Date</p>
                <p className="font-medium">{new Date(inquiry.travel_dates_from).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium">{inquiry.status}</p>
              </div>
            </div>
            {inquiry.special_requirements && (
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">Special Requirements</p>
                <p className="font-medium">{inquiry.special_requirements}</p>
              </div>
            )}
          </Card>

          {/* Agent Info */}
          {agent && (
            <Card className="p-6 bg-blue-50 border-blue-200">
              <h2 className="font-semibold mb-3">Generated by Agent</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Company</p>
                  <p className="font-medium">{agent.company_name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Contact Person</p>
                  <p className="font-medium">{agent.first_name} {agent.last_name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p className="font-medium">{agent.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="font-medium">{agent.status}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Destination & Package Info */}
          {(destination || package_) && (
            <div className="grid md:grid-cols-2 gap-6">
              {destination && (
                <Card className="p-6 bg-green-50 border-green-200">
                  <h2 className="font-semibold mb-3 text-green-900">Selected Destination</h2>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Destination</p>
                      <p className="font-medium text-lg">{destination.name}</p>
                    </div>
                    {destination.country && (
                      <div>
                        <p className="text-muted-foreground">Location</p>
                        <p className="font-medium">{destination.country}{destination.region ? `, ${destination.region}` : ''}</p>
                      </div>
                    )}
                    {destination.tagline && (
                      <div>
                        <p className="text-muted-foreground">Tagline</p>
                        <p className="font-medium">{destination.tagline}</p>
                      </div>
                    )}
                    {destination.best_time_to_visit && (
                      <div>
                        <p className="text-muted-foreground">Best Time to Visit</p>
                        <p className="font-medium">{destination.best_time_to_visit}</p>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {package_ && (
                <Card className="p-6 bg-purple-50 border-purple-200">
                  <h2 className="font-semibold mb-3 text-purple-900">Selected Package</h2>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Package Name</p>
                      <p className="font-medium text-lg">{package_.name}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {package_.duration_days && (
                        <div>
                          <p className="text-muted-foreground">Duration</p>
                          <p className="font-medium">{package_.duration_days} days</p>
                        </div>
                      )}
                      {package_.currency && (
                        <div>
                          <p className="text-muted-foreground">Currency</p>
                          <p className="font-medium">{package_.currency}</p>
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {package_.price_min && (
                        <div>
                          <p className="text-muted-foreground">Min Price</p>
                          <p className="font-medium">{package_.currency} {package_.price_min}</p>
                        </div>
                      )}
                      {package_.price_max && (
                        <div>
                          <p className="text-muted-foreground">Max Price</p>
                          <p className="font-medium">{package_.currency} {package_.price_max}</p>
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {package_.min_group_size && (
                        <div>
                          <p className="text-muted-foreground">Min Group</p>
                          <p className="font-medium">{package_.min_group_size} people</p>
                        </div>
                      )}
                      {package_.max_group_size && (
                        <div>
                          <p className="text-muted-foreground">Max Group</p>
                          <p className="font-medium">{package_.max_group_size} people</p>
                        </div>
                      )}
                    </div>
                    {package_.description && (
                      <div>
                        <p className="text-muted-foreground">Description</p>
                        <p className="font-medium text-xs">{package_.description}</p>
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* Messages */}
          <Card className="p-6 flex flex-col h-96">
            <h2 className="font-semibold mb-4">Messages</h2>
            <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-accent/30 rounded mb-4">
              {messages.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No messages yet. Start the conversation!</p>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender_id === SYSTEM_ADMIN_ID ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-3 py-2 rounded ${msg.sender_id === SYSTEM_ADMIN_ID ? 'bg-primary text-primary-foreground' : 'bg-background border'}`}>
                      <p className="text-sm">{msg.message_text}</p>
                      <p className="text-xs opacity-70 mt-1">{new Date(msg.created_at).toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-sm"
                disabled={sending}
              />
              <Button
                size="sm"
                onClick={handleSendMessage}
                disabled={sending || !messageText.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Sidebar - Attachments */}
        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Files ({attachments.length})</h3>
            <div className="space-y-2">
              {attachments.map((att) => (
                <div key={att.id} className="flex items-center justify-between p-2 bg-accent rounded text-sm">
                  <span className="truncate">{att.file_name}</span>
                  <Button variant="ghost" size="sm"><Download className="w-4 h-4" /></Button>
                </div>
              ))}
              {attachments.length === 0 && <p className="text-sm text-muted-foreground">No files</p>}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
