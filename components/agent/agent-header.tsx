'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function AgentHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/agent/auth/login');
    } catch (error) {
      console.error('[v0] Error logging out:', error);
    }
  };

  return (
    <header className="bg-white border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/agent/dashboard" className="text-2xl font-serif font-bold text-primary">
          Pearl DMC
        </Link>

        <div className="flex items-center gap-4 relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            Profile
            <ChevronDown className="w-4 h-4" />
          </Button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-2 bg-white border border-border rounded-lg shadow-lg z-50 min-w-48">
              <Link
                href="/agent/profile"
                className="block px-4 py-2 hover:bg-muted transition-colors border-b"
                onClick={() => setShowMenu(false)}
              >
                View Profile
              </Link>
              <button
                onClick={() => {
                  setShowMenu(false);
                  handleLogout();
                }}
                className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
