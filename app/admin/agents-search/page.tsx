'use client'

import { useState } from 'react'
import { getAgentByEmail } from '@/lib/supabase-queries'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function AgentSearchPage() {
  const [email, setEmail] = useState('travelifyofficial@gmail.com')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    
    try {
      console.log('[v0] Searching for agent:', email)
      const agent = await getAgentByEmail(email)
      
      if (agent) {
        setResult(agent)
        console.log('[v0] Agent found:', agent)
      } else {
        setError('Agent not found in database')
        console.log('[v0] No agent found for email:', email)
      }
    } catch (err: any) {
      setError(err.message || 'Error searching for agent')
      console.error('[v0] Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Agent Diagnostic Search</h1>
          <p className="text-muted-foreground">Search for an agent by email to diagnose the listing issue</p>
        </div>

        <Card className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Agent Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="travelifyofficial@gmail.com"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background"
            />
          </div>
          
          <Button 
            onClick={handleSearch}
            disabled={loading || !email}
            className="w-full"
          >
            {loading ? 'Searching...' : 'Search Agent'}
          </Button>
        </Card>

        {error && (
          <Card className="p-6 bg-red-50 border-red-200">
            <p className="font-medium text-red-900">Error: {error}</p>
            <p className="text-sm text-red-800 mt-2">This means the agent profile doesn't exist in the database. Check if signup completed successfully.</p>
          </Card>
        )}

        {result && (
          <Card className="p-6 bg-green-50 border-green-200">
            <p className="font-medium text-green-900 mb-4">Agent Found! ✓</p>
            <div className="space-y-3 text-sm bg-white p-4 rounded border border-green-200">
              <div>
                <span className="font-medium">Agent ID:</span>
                <p className="text-muted-foreground">{result.id}</p>
              </div>
              <div>
                <span className="font-medium">Company:</span>
                <p className="text-muted-foreground">{result.company_name}</p>
              </div>
              <div>
                <span className="font-medium">Contact:</span>
                <p className="text-muted-foreground">{result.first_name} {result.last_name}</p>
              </div>
              <div>
                <span className="font-medium">Email:</span>
                <p className="text-muted-foreground">{result.users?.email}</p>
              </div>
              <div>
                <span className="font-medium">Status:</span>
                <p className="text-muted-foreground">{result.status}</p>
              </div>
              <div>
                <span className="font-medium">Phone:</span>
                <p className="text-muted-foreground">{result.phone}</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
