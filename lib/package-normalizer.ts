import { TourPackage, ItineraryDay } from './destinations-data';

/**
 * Creates a default itinerary based on package duration
 */export function getDefaultItinerary(durationStr: string): ItineraryDay[] {
  const match = durationStr.match(/(\d+)\s*Days?/i);
  const days = match ? parseInt(match[1]) : 5;
  
  const itinerary: ItineraryDay[] = [];
  for (let i = 1; i <= days; i++) {
    if (i === 1) {
      itinerary.push({
        day: i,
        title: 'Arrival',
        description: `Arrive at destination and transfer to hotel. Check-in and orientation.`,
        activities: ['Airport Transfer', 'Hotel Check-in', 'City Orientation'],
        meals: ['Dinner'],
        accommodation: 'Hotel'
      });
    } else if (i === days) {
      itinerary.push({
        day: i,
        title: 'Departure',
        description: 'Checkout and transfer to airport. Fly back home with memories.',
        activities: ['Hotel Checkout', 'Airport Transfer'],
        meals: ['Breakfast'],
        accommodation: 'Airport Transfer'
      });
    } else {
      itinerary.push({
        day: i,
        title: `Day ${i} Exploration`,
        description: `Explore local attractions and enjoy activities as per itinerary.`,
        activities: ['Sightseeing', 'Local Tours', 'Cultural Activities'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Hotel'
      });
    }
  }
  return itinerary;
}

/**
 * Normalizes packages to ensure all required fields exist
 * Adds defaults for packages missing new fields
 */
export function normalizePackage(pkg: any): TourPackage {
  return {
    ...pkg,
    description: pkg.description || `Experience the best of this destination with the ${pkg.name} tour package. Explore local attractions, enjoy authentic experiences, and create unforgettable memories.`,
    exclusions: pkg.exclusions || ['International flights', 'Personal expenses', 'Optional activities', 'Tips and gratuities'],
    itinerary: pkg.itinerary || getDefaultItinerary(pkg.duration),
    rating: pkg.rating !== undefined ? pkg.rating : 4
  };
}
