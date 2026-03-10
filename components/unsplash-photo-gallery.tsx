'use client';

import { useEffect, useState } from 'react';
import { PhotoGallery } from '@/components/photo-gallery';
import { getPackagePhotos } from '@/lib/unsplash-service';

interface UnsplashPhotoGalleryProps {
  packageName: string;
  destinationName: string;
  title?: string;
  columns?: number;
  photoCount?: number;
}

export function UnsplashPhotoGallery({
  packageName,
  destinationName,
  title = 'Photo Gallery',
  columns = 3,
  photoCount = 6,
}: UnsplashPhotoGalleryProps) {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const fetchedPhotos = await getPackagePhotos(packageName, destinationName, photoCount);
        
        if (fetchedPhotos.length > 0) {
          setPhotos(fetchedPhotos);
          setError(null);
        } else {
          setError('No photos available');
        }
      } catch (err) {
        console.error('[v0] Error loading photos:', err);
        setError('Failed to load photos');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [packageName, destinationName, photoCount]);

  if (loading) {
    return (
      <section className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-8">{title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(photoCount)].map((_, i) => (
              <div
                key={i}
                className="bg-muted animate-pulse rounded-lg h-64"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || photos.length === 0) {
    return (
      <section className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-8">{title}</h2>
          <div className="bg-muted/50 rounded-lg p-8 text-center">
            <p className="text-muted-foreground">Photos coming soon for {packageName}</p>
          </div>
        </div>
      </section>
    );
  }

  return <PhotoGallery photos={photos} title={title} columns={columns} />;
}
