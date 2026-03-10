'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { adminStore } from '@/lib/admin-store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';

export default function EditPackagePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  // Parse destination and package IDs from URL format: destinationId-packageId
  const [destinationId, packageId] = id.includes('-') 
    ? id.split('-').slice(0, 2) as [string, string]
    : ['', ''];
  
  const [loading, setLoading] = useState(true);
  const [package_, setPackage] = useState<any>(null);
  const [destination, setDestination] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration_days: 3,
    price_min: 0,
    price_max: 0,
    currency: 'USD',
    highlights: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (destinationId && packageId) {
      const dest = adminStore.getDestination(destinationId);
      
      if (dest) {
        setDestination(dest);
        const pkg = dest.packages.find((p: any) => p.id === packageId);
        
        if (pkg) {
          setPackage(pkg);
          setFormData({
            name: pkg.name || '',
            description: pkg.description || '',
            duration_days: pkg.duration_days || 3,
            price_min: pkg.price_min || 0,
            price_max: pkg.price_max || 0,
            currency: pkg.currency || 'USD',
            highlights: Array.isArray(pkg.highlights) ? pkg.highlights.join(', ') : ''
          });
        } else {
          setError('Package not found');
        }
      } else {
        setError('Destination not found');
      }
    }
    setLoading(false);
  }, [destinationId, packageId, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Package name is required');
      return;
    }

    try {
      const highlights = formData.highlights
        .split(',')
        .map(h => h.trim())
        .filter(h => h);

      const updated = adminStore.updatePackage(destinationId, packageId, {
        ...formData,
        highlights
      });

      if (updated) {
        router.push(`/admin/destinations/${destinationId}`);
      } else {
        setError('Failed to update package');
      }
    } catch (err) {
      setError('Error updating package: ' + (err as Error).message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!package_ || !destination) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-destructive mb-4">{error || 'Package not found'}</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-2">Edit Package</h1>
          <p className="text-muted-foreground mb-6">
            {destination.name} / {package_.name}
          </p>

          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Package Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., 5-Day Beach Tour"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Package description..."
                className="w-full p-2 border rounded-lg bg-background text-foreground"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Duration (Days) *</label>
                <Input
                  type="number"
                  value={formData.duration_days}
                  onChange={(e) => setFormData({ ...formData, duration_days: parseInt(e.target.value) })}
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Currency</label>
                <Input
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  placeholder="USD"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Price Min *</label>
                <Input
                  type="number"
                  value={formData.price_min}
                  onChange={(e) => setFormData({ ...formData, price_min: parseFloat(e.target.value) })}
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Price Max *</label>
                <Input
                  type="number"
                  value={formData.price_max}
                  onChange={(e) => setFormData({ ...formData, price_max: parseFloat(e.target.value) })}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Highlights (comma-separated)</label>
              <textarea
                value={formData.highlights}
                onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                placeholder="Highlight 1, Highlight 2, Highlight 3..."
                className="w-full p-2 border rounded-lg bg-background text-foreground"
                rows={3}
              />
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
