'use client';

// Admin Dashboard - Manage destinations and packages
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase-client';
import { adminStore } from '@/lib/admin-store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  MapPin,
  Package,
  MessageSquare,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  Trash2,
  ArrowLeft,
  ChevronRight,
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    destinations: 0,
    packages: 0,
    inquiries: 0,
    agents: 0
  });

  useEffect(() => {
    const dests = adminStore.getDestinations();
    const totalPackages = dests.reduce((sum, d) => sum + (d.packages?.length || 0), 0);
    
    setStats({
      destinations: dests.length,
      packages: totalPackages,
      inquiries: 0,
      agents: 0
    });
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your travel app content and bookings</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Destinations</p>
              <p className="text-3xl font-bold mt-2">{stats.destinations}</p>
            </div>
            <MapPin className="w-10 h-10 text-primary opacity-50" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Packages</p>
              <p className="text-3xl font-bold mt-2">{stats.packages}</p>
            </div>
            <Package className="w-10 h-10 text-primary opacity-50" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Inquiries</p>
              <p className="text-3xl font-bold mt-2">{stats.inquiries}</p>
            </div>
            <MessageSquare className="w-10 h-10 text-primary opacity-50" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Agents</p>
              <p className="text-3xl font-bold mt-2">{stats.agents}</p>
            </div>
            <TrendingUp className="w-10 h-10 text-primary opacity-50" />
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Destinations</h2>
          <p className="text-muted-foreground text-sm mb-4">Manage travel destinations and their details</p>
          <div className="flex gap-2">
            <Link href="/admin/destinations" className="flex-1">
              <Button variant="outline" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                View All
              </Button>
            </Link>
            <Link href="/admin/destinations/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Packages</h2>
          <p className="text-muted-foreground text-sm mb-4">Manage tour packages and pricing</p>
          <div className="flex gap-2">
            <Link href="/admin/packages" className="flex-1">
              <Button variant="outline" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                View All
              </Button>
            </Link>
            <Link href="/admin/packages/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
