'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TourPackage, Destination } from '@/lib/destinations-data';
import { adminStore } from '@/lib/admin-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface PackageFormProps {
  destination?: Destination;
  package?: TourPackage;
  isEdit?: boolean;
}

export function PackageForm({ destination, package: pkg, isEdit = false }: PackageFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: pkg?.id || '',
    name: pkg?.name || '',
    duration: pkg?.duration || '',
    description: pkg?.description || '',
    startingPrice: pkg?.startingPrice || 0,
    currency: pkg?.currency || 'USD',
    category: pkg?.category || 'cultural',
    rating: pkg?.rating || 4,
    image: pkg?.image || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['startingPrice', 'rating'].includes(name) ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination) return;
    setError('');
    setLoading(true);

    try {
      if (!formData.name || !formData.duration || !formData.description) {
        setError('Please fill in all required fields');
        return;
      }

      const newPackage: TourPackage = {
        ...formData,
        highlights: [],
        inclusions: [],
        exclusions: [],
        itinerary: []
      };

      if (isEdit && pkg) {
        adminStore.updatePackage(destination.id, pkg.id, newPackage);
      } else {
        adminStore.addPackage(destination.id, newPackage);
      }

      router.push('/admin/packages');
    } catch (err) {
      setError('Failed to save package');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 max-w-2xl">
      <h1 className="text-3xl font-serif font-bold mb-6">
        {isEdit ? 'Edit Package' : 'Add New Package'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Package ID *</label>
          <Input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="e.g., ph-bali-5d"
            disabled={isEdit}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Package Name *</label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Bali Paradise Tour"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Duration *</label>
          <Input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g., 5 Days / 4 Nights"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe this package..."
            className="w-full px-3 py-2 border border-input rounded-md"
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Starting Price *</label>
            <Input
              type="number"
              name="startingPrice"
              value={formData.startingPrice}
              onChange={handleChange}
              placeholder="1500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-md"
            >
              <option value="cultural">Cultural</option>
              <option value="adventure">Adventure</option>
              <option value="beach">Beach</option>
              <option value="luxury">Luxury</option>
              <option value="honeymoon">Honeymoon</option>
              <option value="group">Group</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Rating (1-5)</label>
          <Input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="5"
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : isEdit ? 'Update Package' : 'Create Package'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
