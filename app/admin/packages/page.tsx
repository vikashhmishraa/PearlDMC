'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminStore } from '@/lib/admin-store';
import { Destination, TourPackage } from '@/lib/destinations-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Edit2, Trash2, Package, ArrowLeft } from 'lucide-react';

export default function PackagesPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allDestinations = adminStore.getDestinations();
    setDestinations(allDestinations);
    if (allDestinations.length > 0) {
      setSelectedDestination(allDestinations[0].id);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (selectedDestination) {
      const dest = adminStore.getDestination(selectedDestination);
      if (dest) {
        setPackages(dest.packages || []);
      }
    }
  }, [selectedDestination]);

  const handleDeletePackage = (packageId: string) => {
    if (!window.confirm('Are you sure you want to delete this package?')) return;
    adminStore.deletePackage(selectedDestination, packageId);
    const dest = adminStore.getDestination(selectedDestination);
    if (dest) {
      setPackages(dest.packages || []);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Packages Management</h1>
            <p className="text-muted-foreground">Manage tour packages by destination</p>
          </div>
        </div>
        {selectedDestination && (
          <Link href={`/admin/packages/new?destination=${selectedDestination}`}>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Package
            </Button>
          </Link>
        )}
      </div>

      {/* Destination Selector */}
      <Card className="p-4">
        <label className="block text-sm font-medium mb-2">Select Destination</label>
        <select
          value={selectedDestination}
          onChange={(e) => setSelectedDestination(e.target.value)}
          className="w-full p-2 border rounded-lg bg-background text-foreground"
        >
          {destinations.map((dest) => (
            <option key={dest.id} value={dest.id}>
              {dest.name}
            </option>
          ))}
        </select>
      </Card>

      {/* Packages List */}
      {packages.length === 0 ? (
        <Card className="p-12 text-center">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground mb-4">No packages for this destination</p>
          {selectedDestination && (
            <Link href={`/admin/packages/new?destination=${selectedDestination}`}>
              <Button>Create First Package</Button>
            </Link>
          )}
        </Card>
      ) : (
        <div className="space-y-4">
          {packages.map((pkg: any) => (
            <Card key={pkg.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{pkg.name}</h3>
                  {pkg.description && (
                    <p className="text-sm text-muted-foreground mt-1">{pkg.description}</p>
                  )}
                  <div className="grid grid-cols-4 gap-4 mt-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <p className="font-medium">{pkg.duration_days} days</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Price Range:</span>
                      <p className="font-medium">
                        {pkg.currency} {pkg.price_min} - {pkg.price_max}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Highlights:</span>
                      <p className="font-medium">{pkg.highlights?.length || 0} items</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Link href={`/admin/packages/${selectedDestination}-${pkg.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeletePackage(pkg.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
