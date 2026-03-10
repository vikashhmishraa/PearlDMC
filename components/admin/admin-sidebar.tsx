'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAdmin } from '@/contexts/admin-context';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  MapPin,
  Package,
  MessageSquare,
  LogOut,
  Settings,
  ChevronRight,
  Users,
  Plus,
  Search
} from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/destinations', label: 'Destinations', icon: MapPin },
  { href: '/admin/packages', label: 'Packages', icon: Package },
  { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
  { type: 'separator' },
  { href: '/admin/agents', label: 'Agents', icon: Users },
  { href: '/admin/create-agent-profile', label: 'Create Missing Agents', icon: Plus },
  { href: '/admin/agents-search', label: 'Search Agents', icon: Search },
  { type: 'separator' },
  { href: '/admin/profile', label: 'Profile', icon: Settings }
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, session } = useAdmin();

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-serif font-bold text-primary">Pearl DMC</h2>
        <p className="text-xs text-muted-foreground">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item, index) => {
          // Handle separator items
          if ('type' in item && item.type === 'separator') {
            return (
              <div key={`separator-${index}`} className="my-2 border-t border-border" />
            );
          }

          // TypeScript guard for items with href
          if (!('href' in item) || typeof item.href !== 'string') {
            return null;
          }

          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1">{item.label}</span>
              {isActive && <ChevronRight className="w-4 h-4" />}
            </Link>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-border space-y-3">
        <div className="px-4 py-2">
          <p className="text-xs text-muted-foreground">Logged in as</p>
          <p className="text-sm font-medium truncate">{session?.email}</p>
        </div>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
