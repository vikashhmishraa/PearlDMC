'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Destination } from '@/lib/destinations-data';
import { adminStore } from '@/lib/admin-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Save } from 'lucide-react';

interface DestinationFormProps {
  destination?: Destination;
  isEdit?: boolean;
}

const REGIONS = [
  { value: 'asia-pacific', label: 'Asia Pacific' },
  { value: 'indian-ocean', label: 'Indian Ocean' },
  { value: 'africa', label: 'Africa' },
  { value: 'caribbean', label: 'Caribbean' }
];

export function DestinationForm({ destination, isEdit = false }: DestinationFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: destination?.id || '',
    name: destination?.name || '',
    country: destination?.country || '',
    region: destination?.region || 'asia-pacific',
    tagline: destination?.tagline || '',
    description: destination?.description || '',
    heroImage: destination?.heroImage || '',
    bestTimeToVisit: destination?.bestTimeToVisit || '',
    currency: destination?.currency || '',
    language: destination?.language || '',
    timezone: destination?.timezone || ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.id) newErrors.id = 'Destination ID is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.tagline) newErrors.tagline = 'Tagline is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.bestTimeToVisit) newErrors.bestTimeToVisit = 'Best time to visit is required';
    if (!formData.currency) newErrors.currency = 'Currency is required';
    if (!formData.language) newErrors.language = 'Language is required';
    if (!formData.timezone) newErrors.timezone = 'Timezone is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (isEdit && destination) {
        adminStore.updateDestination(destination.id, formData);
      } else {
        const newDest: Destination = {
          ...formData,
          id: formData.id.toLowerCase().replace(/\s+/g, '-'),
          galleryImages: [],
          highlights: [],
          packages: []
        };
        adminStore.addDestination(newDest);
      }

      router.push('/admin/destinations');
    } catch (err) {
      setErrors({ submit: 'Failed to save destination' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">
            {isEdit ? 'Edit Destination' : 'Add New Destination'}
          </h1>
          <p className="text-muted-foreground">
            {isEdit ? 'Update destination details' : 'Create a new travel destination'}
          </p>
        </div>

        {errors.submit && (
          <div className="mb-6 flex items-center gap-3 bg-destructive/10 border border-destructive/30 rounded-lg p-4">
            <AlertCircle className="w-5 h-5 text-destructive" />
            <p className="text-sm text-destructive">{errors.submit}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div>
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Destination ID *</label>
                <Input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="e.g., costa-rica"
                  disabled={isEdit}
                  className={errors.id ? 'border-destructive' : ''}
                  required
                />
                {errors.id && <p className="text-xs text-destructive mt-1">{errors.id}</p>}
                <p className="text-xs text-muted-foreground mt-1">Auto-formatted, lowercase with hyphens</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Destination Name *</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Costa Rica"
                  className={errors.name ? 'border-destructive' : ''}
                  required
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Country *</label>
                <Input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="e.g., Costa Rica"
                  className={errors.country ? 'border-destructive' : ''}
                  required
                />
                {errors.country && <p className="text-xs text-destructive mt-1">{errors.country}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Region *</label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                  required
                >
                  {REGIONS.map(region => (
                    <option key={region.value} value={region.value}>
                      {region.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-muted-foreground mt-1">Where will this destination appear</p>
              </div>
            </div>
          </div>

          {/* Description & Tagline */}
          <div>
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Description</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tagline *</label>
                <Input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  placeholder="e.g., 'Eco-Paradise of Central America'"
                  className={errors.tagline ? 'border-destructive' : ''}
                  required
                />
                {errors.tagline && <p className="text-xs text-destructive mt-1">{errors.tagline}</p>}
                <p className="text-xs text-muted-foreground mt-1">Short, catchy description</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Full Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detailed description of the destination..."
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-lg bg-background resize-none ${errors.description ? 'border-destructive' : 'border-border'}`}
                  required
                />
                {errors.description && <p className="text-xs text-destructive mt-1">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Hero Image URL</label>
                <Input
                  type="text"
                  name="heroImage"
                  value={formData.heroImage}
                  onChange={handleChange}
                  placeholder="/images/costa-rica-hero.jpg"
                />
                <p className="text-xs text-muted-foreground mt-1">Path to main hero image</p>
              </div>
            </div>
          </div>

          {/* Travel Details */}
          <div>
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Travel Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Best Time to Visit *</label>
                <Input
                  type="text"
                  name="bestTimeToVisit"
                  value={formData.bestTimeToVisit}
                  onChange={handleChange}
                  placeholder="e.g., December - April"
                  className={errors.bestTimeToVisit ? 'border-destructive' : ''}
                  required
                />
                {errors.bestTimeToVisit && <p className="text-xs text-destructive mt-1">{errors.bestTimeToVisit}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Currency *</label>
                <Input
                  type="text"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  placeholder="e.g., CRC (Costa Rican Colón)"
                  className={errors.currency ? 'border-destructive' : ''}
                  required
                />
                {errors.currency && <p className="text-xs text-destructive mt-1">{errors.currency}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Language *</label>
                <Input
                  type="text"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  placeholder="e.g., Spanish, English"
                  className={errors.language ? 'border-destructive' : ''}
                  required
                />
                {errors.language && <p className="text-xs text-destructive mt-1">{errors.language}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Timezone *</label>
                <Input
                  type="text"
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  placeholder="e.g., GMT-6"
                  className={errors.timezone ? 'border-destructive' : ''}
                  required
                />
                {errors.timezone && <p className="text-xs text-destructive mt-1">{errors.timezone}</p>}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Saving...' : isEdit ? 'Update Destination' : 'Create Destination'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
