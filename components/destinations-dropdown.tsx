'use client';

import { useDestinations } from '@/hooks/use-destinations';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface Region {
  name: string;
  destinations: { label: string; href: string }[];
}

export function DestinationsDropdown() {
  const { destinations } = useDestinations();

  // Group destinations by region
  const regionMap: Record<string, Region> = {};

  destinations.forEach(dest => {
    const region = dest.region || 'other';
    const regionName = {
      'asia-pacific': 'Asia Pacific',
      'indian-ocean': 'Indian Ocean',
      'africa': 'Africa',
      'caribbean': 'Caribbean',
      'other': 'Other'
    }[region] || 'Other';

    if (!regionMap[region]) {
      regionMap[region] = {
        name: regionName,
        destinations: []
      };
    }

    regionMap[region].destinations.push({
      label: dest.name,
      href: `/destinations/${dest.id}`
    });
  });

  const regions = Object.values(regionMap);

  return (
    <div className="relative group">
      <button className="flex items-center gap-1 text-foreground hover:text-primary transition-colors">
        Destinations
        <ChevronDown className="w-4 h-4" />
      </button>
      
      {/* Dropdown Menu */}
      <div className="absolute left-0 mt-0 w-64 bg-card rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
        <div className="p-4 space-y-4">
          {regions.map(region => (
            <div key={region.name}>
              <h3 className="font-semibold text-sm text-foreground mb-2">{region.name}</h3>
              <ul className="space-y-1">
                {region.destinations.map(dest => (
                  <li key={dest.href}>
                    <Link
                      href={dest.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1"
                    >
                      {dest.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
