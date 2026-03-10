'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, CheckCircle, AlertCircle } from 'lucide-react'

export default function VerifyEmailPage() {
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get email from localStorage if available
    const storedEmail = typeof window !== 'undefined' ? localStorage.getItem('agentSignupEmail') : null
    if (storedEmail) {
      setEmail(storedEmail)
    }
    setLoading(false)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/5 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <div className="p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <CheckCircle className="absolute bottom-0 right-0 w-6 h-6 text-green-600 bg-white rounded-full" />
            </div>
          </div>

          <h1 className="text-3xl font-serif font-bold mb-2">Verify Your Email</h1>
          <p className="text-muted-foreground mb-6">
            We've sent a confirmation link to{' '}
            <span className="font-semibold text-foreground">{email || 'your email address'}</span>
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Next Steps:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Check your email inbox</li>
                  <li>Click the verification link</li>
                  <li>Your account will be activated</li>
                </ol>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            Didn't receive the email? Check your spam folder or try signing up again.
          </p>

          <div className="space-y-3">
            <Link href="/agent/auth/login" className="block">
              <Button className="w-full">Back to Login</Button>
            </Link>
            <Link href="/agent/auth/signup" className="block">
              <Button variant="outline" className="w-full">
                Sign Up Again
              </Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </Card>
    </div>
  )
}
