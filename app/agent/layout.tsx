'use client'

import { AgentProvider } from '@/contexts/agent-auth-context'

export default function AgentLayout({ children }: { children: React.ReactNode }) {
  return (
    <AgentProvider>
      {children}
    </AgentProvider>
  )
}
