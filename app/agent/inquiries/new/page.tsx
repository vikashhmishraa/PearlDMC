'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAgent } from '@/contexts/agent-auth-context'
import { supabase } from '@/lib/supabase-client'
import { getDestinations, getPackages, createInquiry } from '@/lib/supabase-queries'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { AlertCircle, ArrowLeft, Send } from 'lucide-react'

export default function NewInquiry() {
  const router = useRouter()
  const { user } = useAgent()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [destinations, setDestinations] = useState<any[]>([])
  const [packages, setPackages] = useState<any[]>([])
  const [selectedDestination, setSelectedDestination] = useState('')
  const [selectedPackage, setSelectedPackage] = useState('')
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    numberOfPeople: '1',
    travelDate: '',
    specialRequests: '',
  })

  useEffect(() => {
    loadDestinations()
  }, [])

  useEffect(() => {
    if (selectedDestination) {
      loadPackages(selectedDestination)
    }
  }, [selectedDestination])

  const loadDestinations = async () => {
    try {
      const data = await getDestinations()
      setDestinations(data || [])
    } catch (err) {
      console.error('[v0] Error loading destinations:', err)
      setError('Failed to load destinations')
    }
  }

  const loadPackages = async (destinationId: string) => {
    try {
      const data = await getPackages(destinationId)
      setPackages(data || [])
    } catch (err) {
      console.error('[v0] Error loading packages:', err)
      setError('Failed to load packages')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!user) {
        setError('You must be logged in')
        return
      }

      if (!selectedPackage) {
        setError('Please select a package')
        return
      }

      // Ensure user exists in users table (for backward compatibility with seeded agents)
      try {
        const { error: upsertError } = await supabase
          .from('users')
          .upsert({
            id: user.id,
            email: user.email || '',
            user_type: 'agent',
            is_active: true,
          }, {
            onConflict: 'id'
          })

        if (upsertError) {
          throw upsertError
        }
      } catch (err) {
        console.error('[v0] User upsert error:', err)
        // Continue - user might already exist
      }

      const inquiry = await createInquiry({
        agent_id: user.id,
        destination_id: selectedDestination,
        package_id: selectedPackage,
        client_name: formData.clientName,
        client_email: formData.clientEmail,
        client_phone: formData.clientPhone,
        client_group_size: parseInt(formData.numberOfPeople),
        travel_dates_from: formData.travelDate,
        special_requirements: formData.specialRequests,
        status: 'new',
      })

      router.push(`/agent/inquiries/${inquiry.id}`)
    } catch (err: any) {
      console.error('[v0] Error creating inquiry:', err)
      setError(err.message || 'Failed to create inquiry')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/agent/dashboard" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-serif font-bold">Create New Inquiry</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="p-8">
          {error && (
            <div className="mb-6 flex items-center gap-3 bg-destructive/10 border border-destructive/30 rounded-lg p-4">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Package Selection */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Select Destination & Package</h2>
              
              {destinations.length === 0 && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900">
                    ⏳ No destinations available yet. The admin team is setting up packages. Please check back soon or contact support.
                  </p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Destination *</label>
                  <select
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                    required
                    disabled={destinations.length === 0}
                  >
                    <option value="">
                      {destinations.length === 0 ? 'No destinations available' : 'Select a destination'}
                    </option>
                    {destinations.map(dest => (
                      <option key={dest.id} value={dest.id}>{dest.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Package *</label>
                  <select
                    value={selectedPackage}
                    onChange={(e) => setSelectedPackage(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                    required
                    disabled={!selectedDestination || packages.length === 0}
                  >
                    <option value="">
                      {!selectedDestination ? 'Select a destination first' : packages.length === 0 ? 'No packages available' : 'Select a package'}
                    </option>
                    {packages.map(pkg => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} - {pkg.currency} {pkg.price_min}-{pkg.price_max}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Client Information */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Client Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Client Name *</label>
                  <Input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    placeholder="Full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <Input
                    type="email"
                    name="clientEmail"
                    value={formData.clientEmail}
                    onChange={handleChange}
                    placeholder="client@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone *</label>
                  <Input
                    type="tel"
                    name="clientPhone"
                    value={formData.clientPhone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Number of People *</label>
                  <Input
                    type="number"
                    name="numberOfPeople"
                    value={formData.numberOfPeople}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Travel Details */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Travel Details</h2>
              <div>
                <label className="block text-sm font-medium mb-2">Preferred Travel Date *</label>
                <Input
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Special Requests</label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Any special requirements or preferences..."
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background resize-none"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-3">
              <Button type="submit" disabled={loading}>
                <Send className="w-4 h-4 mr-2" />
                {loading ? 'Creating...' : 'Create Inquiry'}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  )
}
