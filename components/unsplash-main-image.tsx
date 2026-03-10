'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchUnsplashPhotos } from '@/lib/unsplash-service';

interface UnsplashMainImageProps {
  packageName: string;
  destinationName: string;
  className?: string;
}

export function UnsplashMainImage({
  packageName,
  destinationName,
  className = 'w-full h-96'
}: UnsplashMainImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const searchQuery = `${destinationName} ${packageName} travel`;
        const photos = await fetchUnsplashPhotos(searchQuery, 1);
        
        if (photos && photos.length > 0) {
          setImageUrl(photos[0].src);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadImage();
  }, [packageName, destinationName]);

  if (loading) {
    return (
      <div className={`${className} bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg animate-pulse`} />
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={`${className} bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center`}>
        <div className="text-center">
          <p className="text-muted-foreground">Unable to load image</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} relative rounded-lg overflow-hidden`}>
      <Image
        src={imageUrl}
        alt={`${packageName} in ${destinationName}`}
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
