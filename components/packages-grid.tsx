'use client';

import { TourPackage } from '@/lib/destinations-data';
import { TourPackageCard } from './tour-package-card';

interface PackagesGridProps {
  packages: TourPackage[];
  destinationName: string;
  destinationSlug: string;
}

export function PackagesGrid({ packages, destinationName, destinationSlug }: PackagesGridProps) {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
            Our Best Tour Packages in {destinationName}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Curated experiences designed for discerning travel agents and their clients. Each package is customizable to meet your specific requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <TourPackageCard key={idx} package={pkg} destinationName={destinationName} destinationSlug={destinationSlug} />
          ))}
        </div>

        <div className="mt-12 bg-primary/5 border-l-4 border-primary rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Custom Packages Available
          </h3>
          <p className="text-muted-foreground mb-4">
            Don't see what you're looking for? Let us create a tailor-made package for your specific needs.
          </p>
          <a
            href="#contact"
            className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Request Custom Package
          </a>
        </div>
      </div>
    </section>
  );
}
