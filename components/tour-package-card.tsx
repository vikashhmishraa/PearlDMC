'use client';

import { TourPackage } from '@/lib/destinations-data';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, ChevronRight, ImageOff } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { InquiryModal } from './inquiry-modal';

interface TourPackageCardProps {
  package: TourPackage;
  destinationName: string;
  destinationSlug: string;
}

export function TourPackageCard({ package: pkg, destinationName, destinationSlug }: TourPackageCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(pkg.image);
  const [imageError, setImageError] = useState(false);

  return (
    <>
      <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
        {/* Image Section */}
        <div className="relative h-64 bg-gradient-to-b from-primary/10 to-transparent flex items-center justify-center p-6 overflow-hidden">
          {imageUrl && !imageError ? (
            <Image
              src={imageUrl}
              alt={pkg.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
              <ImageOff className="w-8 h-8" />
              <span className="text-sm">{destinationName}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{pkg.name}</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{pkg.duration}</span>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < pkg.rating ? 'fill-accent text-accent' : 'text-border'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="text-2xl font-bold text-primary">${pkg.startingPrice.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">per person</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">Highlights:</p>
            <ul className="space-y-1">
              {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <MapPin className="w-3 h-3 mt-1 flex-shrink-0 text-primary" />
                  <span>{highlight}</span>
                </li>
              ))}
              {pkg.highlights.length > 3 && (
                <li className="text-sm text-primary font-medium">
                  +{pkg.highlights.length - 3} more highlights
                </li>
              )}
            </ul>
          </div>

          <div className="pt-4 space-y-2">
            <Link href={`/destinations/${destinationSlug}/packages/${pkg.id}`}>
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group/btn"
              >
                View Details
                <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              onClick={() => setIsOpen(true)}
              variant="outline"
              className="w-full"
            >
              Send Inquiry
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Response within 24 hours
            </p>
          </div>
        </div>
      </div>

      <InquiryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        destinationName={destinationName}
        packageName={pkg.name}
        packagePrice={pkg.startingPrice}
      />
    </>
  );
}
