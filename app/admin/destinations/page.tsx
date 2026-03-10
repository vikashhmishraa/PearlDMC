'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminStore } from '@/lib/admin-store';
import { Destination } from '@/lib/destinations-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Edit, Trash2, MapPin } from 'lucide-react';

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allDestinations = adminStore.getDestinations();
    setDestinations(allDestinations);
    setLoading(false);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this destination?')) {
      adminStore.deleteDestination(id);
      setDestinations(adminStore.getDestinations());
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold">Destinations</h1>
          <p className="text-muted-foreground">Manage all tour destinations</p>
        </div>
        <Link href="/admin/destinations/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Destination
          </Button>
        </Link>
      </div>

      {/* Destinations Grid */}
      {destinations.length === 0 ? (
        <Card className="p-12 text-center">
          <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground mb-4">No destinations yet</p>
          <Link href="/admin/destinations/new">
            <Button>Create First Destination</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <Card key={destination.id} className="p-6 flex flex-col">
              <h3 className="text-lg font-semibold mb-2">{destination.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{destination.description.substring(0, 100)}...</p>
              
              <div className="mb-4 text-sm text-muted-foreground">
                <p>{destination.packages.length} packages</p>
              </div>

              <div className="flex gap-2">
                <Link href={`/admin/destinations/${destination.id}`} className="flex-1">
                  <Button variant="outline" className="w-full" size="sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </Link>
                <Link href={`/admin/destinations/${destination.id}/edit`} className="flex-1">
                  <Button variant="outline" className="w-full" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(destination.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
