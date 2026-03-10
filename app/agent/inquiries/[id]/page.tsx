'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useAgent } from '@/contexts/agent-auth-context'
import { supabase } from '@/lib/supabase-client'
import { getInquiryMessages, sendMessage, uploadAttachment, getInquiryAttachments, updateInquiryStatus } from '@/lib/supabase-queries'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Send, FileUp, Download } from 'lucide-react'

export default function InquiryDetail() {
  const params = useParams()
  const inquiryId = params.id as string
  const { user } = useAgent()
  const [inquiry, setInquiry] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [attachments, setAttachments] = useState<any[]>([])
  const [messageText, setMessageText] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

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
      const msgData = await getInquiryMessages(inquiryId)
      setMessages(msgData || [])
      const attachData = await getInquiryAttachments(inquiryId)
      setAttachments(attachData || [])
    } catch (error) {
      console.error('[v0] Error loading inquiry:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageText.trim() || !user) return

    setSending(true)
    try {
      const newMsg = await sendMessage(inquiryId, user.id, messageText)
      setMessages(prev => [...prev, newMsg])
      setMessageText('')
    } catch (error) {
      console.error('[v0] Error sending message:', error)
    } finally {
      setSending(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return

    try {
      const attachment = await uploadAttachment(file, inquiryId, user.id)
      setAttachments(prev => [...prev, attachment])
    } catch (error) {
      console.error('[v0] Error uploading file:', error)
    }
  }

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  if (!inquiry) return <div className="flex items-center justify-center min-h-screen">Inquiry not found</div>

  return (
    <div className="space-y-6">
      <Link href="/agent/dashboard" className="flex items-center gap-2 text-primary">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h1 className="text-3xl font-serif font-bold mb-4">Customer Inquiry</h1>
            <div className="grid grid-cols-2 gap-4">
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
            </div>
          </Card>

          <Card className="p-6 flex flex-col h-96">
            <h2 className="font-semibold mb-4">Messages</h2>
            <div className="flex-1 overflow-y-auto space-y-3 mb-4 p-4 bg-accent/30 rounded">
              {messages.length === 0 ? (
                <p className="text-sm text-muted-foreground">No messages</p>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-3 py-2 rounded ${msg.sender_id === user?.id ? 'bg-primary text-primary-foreground' : 'bg-background border'}`}>
                      <p className="text-sm">{msg.message_text}</p>
                      <p className="text-xs opacity-70">{new Date(msg.created_at).toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input value={messageText} onChange={(e) => setMessageText(e.target.value)} placeholder="Message..." disabled={sending} />
              <Button type="submit" disabled={sending}><Send className="w-4 h-4" /></Button>
            </form>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-6">
            <label className="text-sm font-medium mb-2 block">Inquiry Status</label>
            <select value={inquiry.status} onChange={(e) => updateInquiryStatus(inquiryId, e.target.value).then(() => setInquiry((prev: any) => ({ ...prev, status: e.target.value })))} className="w-full px-2 py-1 border rounded">
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="negotiating">Negotiating</option>
              <option value="proposed">Proposed</option>
              <option value="confirmed">Confirmed</option>
              <option value="rejected">Rejected</option>
            </select>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Files ({attachments.length})</h3>
            <div className="space-y-2 mb-4">
              {attachments.map((att) => (
                <div key={att.id} className="flex items-center justify-between p-2 bg-accent rounded text-sm">
                  <span className="truncate">{att.file_name}</span>
                  <Button variant="ghost" size="sm"><Download className="w-4 h-4" /></Button>
                </div>
              ))}
            </div>
            <label>
              <input type="file" onChange={handleFileUpload} className="hidden" />
              <Button asChild variant="outline" className="w-full"><span>Upload</span></Button>
            </label>
          </Card>
        </div>
      </div>
    </div>
  )
}
