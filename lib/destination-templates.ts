import { Destination, TourPackage } from './destinations-data';

/**
 * DESTINATION TEMPLATE - Copy and customize for new destinations
 * 
 * Simply fill in the blanks with your destination details and packages
 */

export const destinationTemplate: Destination = {
  // Unique identifier (lowercase, no spaces)
  id: 'destination-id',
  
  // Display name
  name: 'Destination Name',
  country: 'Country Name',
  region: 'asia-pacific', // Options: 'asia-pacific' | 'indian-ocean' | 'africa' | 'caribbean'
  
  // SEO and marketing
  tagline: 'Short, compelling description',
  description: 'Longer detailed description of the destination',
  
  // Image paths (store in /public/images/)
  heroImage: '/images/destination-hero.jpg',
  galleryImages: [
    '/images/destination-1.jpg',
    '/images/destination-2.jpg',
    '/images/destination-3.jpg',
  ],
  
  // Key attractions/highlights
  highlights: [
    'Highlight 1',
    'Highlight 2',
    'Highlight 3',
    'Highlight 4',
  ],
  
  // Practical information
  bestTimeToVisit: 'Month - Month',
  currency: 'USD',
  language: 'Language',
  timezone: 'UTC±X',
  
  // Tour packages for this destination
  packages: [
    // Add packages here (see packageTemplate below)
  ],
};

/**
 * PACKAGE TEMPLATE - Use this structure for each package
 */
export const packageTemplate: TourPackage = {
  // Unique ID combining destination and package type
  id: 'destination-package-type',
  
  // Display name
  name: 'Package Name',
  
  // Duration in format: "X Days / X Nights"
  duration: '7 Days / 6 Nights',
  
  // Detailed description
  description: 'Compelling description of what travelers will experience',
  
  // Key attractions (3-5 items)
  highlights: [
    'Highlight 1',
    'Highlight 2',
    'Highlight 3',
  ],
  
  // What's included
  inclusions: [
    'Accommodation',
    'Meals',
    'Tours and Activities',
    'Professional Guide',
    'Transportation',
  ],
  
  // What's NOT included (auto-fills if empty)
  exclusions: [
    'International flights',
    'Travel insurance',
    'Personal expenses',
    'Tips',
  ],
  
  // Daily itinerary (auto-generated if empty array)
  itinerary: [],
  
  // Pricing
  startingPrice: 1500,
  currency: 'USD',
  
  // Hero image
  image: '/images/destination-package.jpg',
  
  // Star rating (1-5)
  rating: 4,
  
  // Package category for filtering
  category: 'cultural', // Options: 'cultural' | 'adventure' | 'beach' | 'luxury' | 'honeymoon' | 'group'
};

/**
 * ITINERARY DAY TEMPLATE - For detailed itineraries
 * (Only needed if you want custom day-by-day descriptions)
 */
export const itineraryDayTemplate = {
  day: 1,
  title: 'Day Title',
  description: 'What happens on this day',
  activities: ['Activity 1', 'Activity 2', 'Activity 3'],
  meals: ['Breakfast', 'Lunch', 'Dinner'],
  accommodation: 'Hotel Name or Type',
};
