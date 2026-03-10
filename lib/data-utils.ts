import { Destination, TourPackage } from './destinations-data';

/**
 * Validation utilities for destinations and packages
 */

export const destinationValidation = {
  /**
   * Validates a destination object has all required fields
   */
  isValid: (destination: any): destination is Destination => {
    return (
      destination.id &&
      destination.name &&
      destination.country &&
      destination.region &&
      destination.tagline &&
      destination.description &&
      destination.heroImage &&
      destination.highlights &&
      Array.isArray(destination.highlights) &&
      destination.currency &&
      destination.language &&
      destination.timezone &&
      destination.packages &&
      Array.isArray(destination.packages)
    );
  },

  /**
   * Get validation errors for a destination
   */
  getErrors: (destination: any): string[] => {
    const errors: string[] = [];
    if (!destination.id) errors.push('Missing id');
    if (!destination.name) errors.push('Missing name');
    if (!destination.country) errors.push('Missing country');
    if (!['asia-pacific', 'indian-ocean', 'africa', 'caribbean'].includes(destination.region)) {
      errors.push('Invalid region');
    }
    if (!destination.currency) errors.push('Missing currency');
    if (!destination.language) errors.push('Missing language');
    if (!destination.timezone) errors.push('Missing timezone');
    if (!destination.packages || !Array.isArray(destination.packages)) {
      errors.push('Missing or invalid packages array');
    }
    return errors;
  },
};

export const packageValidation = {
  /**
   * Validates a package object has all required fields
   */
  isValid: (pkg: any): pkg is TourPackage => {
    return (
      pkg.id &&
      pkg.name &&
      pkg.duration &&
      pkg.highlights &&
      Array.isArray(pkg.highlights) &&
      pkg.inclusions &&
      Array.isArray(pkg.inclusions) &&
      pkg.startingPrice &&
      pkg.currency &&
      pkg.image &&
      pkg.rating &&
      ['cultural', 'adventure', 'beach', 'luxury', 'honeymoon', 'group'].includes(pkg.category)
    );
  },

  /**
   * Get validation errors for a package
   */
  getErrors: (pkg: any): string[] => {
    const errors: string[] = [];
    if (!pkg.id) errors.push('Missing id');
    if (!pkg.name) errors.push('Missing name');
    if (!pkg.duration) errors.push('Missing duration');
    if (!pkg.highlights || !Array.isArray(pkg.highlights)) errors.push('Invalid highlights');
    if (!pkg.inclusions || !Array.isArray(pkg.inclusions)) errors.push('Invalid inclusions');
    if (!pkg.startingPrice) errors.push('Missing startingPrice');
    if (!pkg.currency) errors.push('Missing currency');
    if (!pkg.image) errors.push('Missing image');
    if (!pkg.rating) errors.push('Missing rating');
    if (!['cultural', 'adventure', 'beach', 'luxury', 'honeymoon', 'group'].includes(pkg.category)) {
      errors.push('Invalid category');
    }
    return errors;
  },
};

/**
 * Data transformation utilities
 */
export const dataTransforms = {
  /**
   * Get all unique regions from destinations
   */
  getRegions: (destinations: Destination[]): string[] => {
    return [...new Set(destinations.map(d => d.region))];
  },

  /**
   * Get all destinations by region
   */
  getByRegion: (destinations: Destination[], region: string): Destination[] => {
    return destinations.filter(d => d.region === region);
  },

  /**
   * Get all packages across all destinations
   */
  getAllPackages: (destinations: Destination[]): TourPackage[] => {
    return destinations.flatMap(d => d.packages);
  },

  /**
   * Get packages by category
   */
  getPackagesByCategory: (packages: TourPackage[], category: string): TourPackage[] => {
    return packages.filter(p => p.category === category);
  },

  /**
   * Filter packages by price range
   */
  getPackagesByPriceRange: (packages: TourPackage[], min: number, max: number): TourPackage[] => {
    return packages.filter(p => p.startingPrice >= min && p.startingPrice <= max);
  },

  /**
   * Sort packages
   */
  sortPackages: (packages: TourPackage[], sortBy: 'price-asc' | 'price-desc' | 'duration' | 'rating'): TourPackage[] => {
    const sorted = [...packages];
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.startingPrice - b.startingPrice);
      case 'price-desc':
        return sorted.sort((a, b) => b.startingPrice - a.startingPrice);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'duration':
        const parseDays = (duration: string) => parseInt(duration.match(/\d+/)?.[0] || '0');
        return sorted.sort((a, b) => parseDays(a.duration) - parseDays(b.duration));
      default:
        return sorted;
    }
  },

  /**
   * Get price range stats
   */
  getPriceStats: (packages: TourPackage[]): { min: number; max: number; avg: number } => {
    if (packages.length === 0) return { min: 0, max: 0, avg: 0 };
    const prices = packages.map(p => p.startingPrice);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
      avg: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
    };
  },
};

/**
 * Generate statistics and insights
 */
export const stats = {
  /**
   * Get total stats for dashboard
   */
  getOverallStats: (destinations: Destination[]) => {
    const allPackages = dataTransforms.getAllPackages(destinations);
    return {
      totalDestinations: destinations.length,
      totalPackages: allPackages.length,
      totalRegions: dataTransforms.getRegions(destinations).length,
      avgPackagePrice: Math.round(
        allPackages.reduce((sum, p) => sum + p.startingPrice, 0) / allPackages.length
      ),
      highestRatedPackage: [...allPackages].sort((a, b) => b.rating - a.rating)[0],
      packagesPerDestination: Math.round(allPackages.length / destinations.length),
    };
  },

  /**
   * Get stats for a specific destination
   */
  getDestinationStats: (destination: Destination) => {
    const priceStats = dataTransforms.getPriceStats(destination.packages);
    return {
      totalPackages: destination.packages.length,
      packageCategories: [...new Set(destination.packages.map(p => p.category))].length,
      priceRange: {
        min: priceStats.min,
        max: priceStats.max,
        avg: priceStats.avg,
      },
      avgRating: Math.round(
        destination.packages.reduce((sum, p) => sum + p.rating, 0) / destination.packages.length * 10
      ) / 10,
    };
  },
};
