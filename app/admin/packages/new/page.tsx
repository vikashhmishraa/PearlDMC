'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { adminStore } from '@/lib/admin-store';
import { Destination } from '@/lib/destinations-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';

export default function NewPackagePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const destinationParam = searchParams.get('destination');
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedDestId, setSelectedDestId] = useState<string>(destinationParam || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration_days: 3,
    price_min: 0,
    price_max: 0,
    currency: 'USD',
    highlights: ''
  });

  useEffect(() => {
    const allDestinations = adminStore.getDestinations();
    setDestinations(allDestinations);
    if (!selectedDestId && allDestinations.length > 0) {
      setSelectedDestId(allDestinations[0].id);
    }
    setLoading(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Package name is required');
      return;
    }

    if (!selectedDestId) {
      setError('Please select a destination');
      return;
    }

    try {
      const highlights = formData.highlights
        .split(',')
        .map(h => h.trim())
        .filter(h => h);

      const newPackage: any = {
        id: Math.random().toString(36).substring(2, 9),
        name: formData.name,
        description: formData.description,
        duration: `${formData.duration_days} days`,
        duration_days: formData.duration_days,
        price_min: formData.price_min,
        price_max: formData.price_max,
        currency: formData.currency,
        highlights: highlights,
        // Required fields for TourPackage interface
        inclusions: [],
        exclusions: [],
        itinerary: [],
        startingPrice: formData.price_min,
        image: '/images/default-package.jpg',
        rating: 4.5,
        category: 'adventure',
        createdAt: new Date().toISOString()
      };

      adminStore.addPackage(selectedDestId, newPackage);
      router.push('/admin/packages');
    } catch (err) {
      setError('Error creating package: ' + (err as Error).message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (destinations.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-destructive mb-4">No destinations available. Please create a destination first.</p>
          <Button onClick={() => router.push('/admin/destinations')}>Create Destination</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-6">
        <Button
          variant="ghost"
          onClick={() => router.push('/admin/packages')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Create New Package</h1>

          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Destination *</label>
              <select
                value={selectedDestId}
                onChange={(e) => setSelectedDestId(e.target.value)}
                className="w-full p-2 border rounded-lg bg-background text-foreground"
              >
                <option value="">Select a destination</option>
                {destinations.map((dest) => (
                  <option key={dest.id} value={dest.id}>
                    {dest.name}
                  </option>
                ))}
              </select>
            </div>

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
              <Button variant="outline" type="button" onClick={() => router.push('/admin/packages')}>
                Cancel
              </Button>
              <Button type="submit">
                Create Package
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
