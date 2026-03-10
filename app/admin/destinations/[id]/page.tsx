'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { adminStore } from '@/lib/admin-store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Plus, Edit2, Trash2, Package } from 'lucide-react';

export default function DestinationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const destinationId = params.id as string;
  const [destination, setDestination] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dest = adminStore.getDestination(destinationId);
    setDestination(dest);
    setLoading(false);
  }, [destinationId]);

  const handleDeletePackage = (packageId: string) => {
    if (!window.confirm('Are you sure you want to delete this package?')) return;
    adminStore.deletePackage(destinationId, packageId);
    const updated = adminStore.getDestination(destinationId);
    setDestination(updated);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-destructive mb-4">Destination not found</p>
          <Button onClick={() => router.push('/admin/destinations')}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Destination Header */}
        <Card className="p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{destination.name}</h1>
              <p className="text-muted-foreground">{destination.description}</p>
            </div>
            <Link href={`/admin/destinations/${destinationId}/edit`}>
              <Button variant="outline" size="sm">
                <Edit2 className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>

        {/* Packages Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Packages</h2>
            <Link href={`/admin/packages/new?destination=${destinationId}`}>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Package
              </Button>
            </Link>
          </div>

          {destination.packages.length === 0 ? (
            <Card className="p-12 text-center text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="mb-4">No packages for this destination yet</p>
              <Link href={`/admin/packages/new?destination=${destinationId}`}>
                <Button>Create First Package</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {destination.packages.map((pkg: any) => (
                <Card key={pkg.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{pkg.name}</h3>
                      {pkg.description && (
                        <p className="text-sm text-muted-foreground mb-3">{pkg.description}</p>
                      )}
                      <div className="grid grid-cols-4 gap-4 text-sm">
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
                      <Link href={`/admin/packages/${destinationId}-${pkg.id}/edit`}>
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
      </div>
    </div>
  );
}
