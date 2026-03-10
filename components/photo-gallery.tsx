'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Photo {
  id: string;
  src: string;
  alt: string;
  title?: string;
  category?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  title?: string;
  columns?: number;
}

export function PhotoGallery({ photos, title = 'Photo Gallery', columns = 3 }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  const handlePrevious = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < photos.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const columnClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }[columns] || 'md:grid-cols-3';

  return (
    <section className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-3xl font-serif font-bold text-foreground mb-8">
            {title}
          </h2>
        )}

        <div className={`grid grid-cols-1 sm:grid-cols-2 ${columnClass} gap-4`}>
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => setSelectedIndex(index)}
              className="relative group overflow-hidden rounded-lg h-64 bg-muted"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {photo.category && (
                <div className="absolute top-3 left-3 bg-primary/80 text-primary-foreground px-3 py-1 rounded text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {photo.category}
                </div>
              )}
              {photo.title && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white font-semibold">{photo.title}</p>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded transition"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrevious}
            disabled={selectedIndex === 0}
            className="absolute left-4 text-white hover:bg-white/20 disabled:opacity-50 p-2 rounded transition"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="relative w-full max-w-4xl h-96 px-12">
            <Image
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              fill
              className="object-contain"
              priority
            />
          </div>

          <button
            onClick={handleNext}
            disabled={selectedIndex === photos.length - 1}
            className="absolute right-4 text-white hover:bg-white/20 disabled:opacity-50 p-2 rounded transition"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {(selectedIndex ?? 0) + 1} / {photos.length}
          </div>
        </div>
      )}
    </section>
  );
}
