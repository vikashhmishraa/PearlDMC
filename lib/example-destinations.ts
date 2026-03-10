/**
 * EXAMPLE DESTINATIONS
 * Use these as copy-paste templates for new destinations
 * 
 * Replace the values and add to destinations array in /lib/destinations-data.ts
 */

// ============================================
// EXAMPLE 1: Cultural Destination (Asia-Pacific)
// ============================================
export const exampleCulturalDestination = {
  id: "vietnam",
  name: "Vietnam",
  country: "Vietnam",
  region: "asia-pacific" as const,
  tagline: "Journey Through Timeless Beauty",
  description: "Discover Vietnam's rich tapestry of ancient temples, vibrant cities, and picturesque landscapes. From the bustling streets of Hanoi to the serene waters of Ha Long Bay, Vietnam offers an unforgettable blend of cultural heritage and natural wonders.",
  heroImage: "/images/vietnam-hero.jpg",
  galleryImages: [
    "/images/vietnam-1.jpg",
    "/images/vietnam-2.jpg",
    "/images/vietnam-3.jpg",
  ],
  highlights: [
    "Ha Long Bay UNESCO Site",
    "Ancient Temples of Hoi An",
    "Ho Chi Minh City Life",
    "Mekong Delta River Cruise"
  ],
  bestTimeToVisit: "October - April",
  currency: "USD",
  language: "Vietnamese",
  timezone: "UTC+7",
  packages: [
    {
      id: "vietnam-luxury-10d",
      name: "Luxury Vietnam Explorer",
      duration: "10 Days / 9 Nights",
      description: "Experience Vietnam in style with luxury accommodations and exclusive experiences in Hanoi, Ha Long Bay, and Ho Chi Minh City.",
      highlights: [
        "Cruise Ha Long Bay",
        "Explore Ancient Hoi An",
        "Mekong Delta Tour",
        "Hanoi Old Quarter Walk"
      ],
      inclusions: [
        "5-Star Hotel Accommodations",
        "Daily Breakfast, Lunch, Dinner",
        "Private Car with English-Speaking Driver",
        "Professional Tour Guide",
        "All Internal Flights",
        "Ha Long Bay 2-Day Cruise",
        "Travel Insurance"
      ],
      exclusions: [
        "International flights",
        "Visa fees",
        "Personal travel insurance",
        "Tips and gratuities"
      ],
      itinerary: [],
      startingPrice: 2250,
      currency: "USD",
      image: "/images/vietnam-hero.jpg",
      rating: 5,
      category: "cultural"
    }
  ]
};

// ============================================
// EXAMPLE 2: Beach Destination (Indian Ocean)
// ============================================
export const exampleBeachDestination = {
  id: "maldives",
  name: "Maldives",
  country: "Maldives",
  region: "indian-ocean" as const,
  tagline: "Paradise on Earth",
  description: "Escape to the Maldives, where crystal-clear turquoise waters meet pristine white sand beaches. This exclusive island nation offers world-class resorts, incredible diving opportunities, and the perfect romantic getaway.",
  heroImage: "/images/maldives-hero.jpg",
  galleryImages: [
    "/images/maldives-1.jpg",
    "/images/maldives-2.jpg",
    "/images/maldives-3.jpg",
  ],
  highlights: [
    "World-Class Diving",
    "Overwater Bungalows",
    "Coral Reef Snorkeling",
    "Sunset Dhoni Cruise"
  ],
  bestTimeToVisit: "November - April",
  currency: "USD",
  language: "Dhivehi",
  timezone: "UTC+5",
  packages: [
    {
      id: "maldives-honeymoon-5d",
      name: "Romantic Honeymoon Escape",
      duration: "5 Days / 4 Nights",
      description: "A perfect romantic getaway with overwater bungalows, spa treatments, and intimate dinners under the stars.",
      highlights: [
        "Private Overwater Villa",
        "Couple's Spa Treatment",
        "Dinner on the Beach",
        "Snorkeling Adventure"
      ],
      inclusions: [
        "Overwater Bungalow",
        "All Meals and Drinks",
        "Spa Credits",
        "Island Transfers",
        "Snorkeling Equipment",
        "Romantic Dinner Setup"
      ],
      startingPrice: 3500,
      currency: "USD",
      image: "/images/maldives-hero.jpg",
      rating: 5,
      category: "honeymoon"
    }
  ]
};

// ============================================
// EXAMPLE 3: Adventure Destination (Africa)
// ============================================
export const exampleAdventureDestination = {
  id: "kenya",
  name: "Kenya",
  country: "Kenya",
  region: "africa" as const,
  tagline: "The Heart of African Safari",
  description: "Witness the raw beauty of Africa on a Kenyan safari. Encounter magnificent wildlife, explore stunning landscapes, and immerse yourself in the vibrant culture of East Africa.",
  heroImage: "/images/kenya-hero.jpg",
  galleryImages: [
    "/images/kenya-1.jpg",
    "/images/kenya-2.jpg",
    "/images/kenya-3.jpg",
  ],
  highlights: [
    "Masai Mara Wildlife",
    "Big Five Safari",
    "Mount Kenya Trekking",
    "Maasai Cultural Village"
  ],
  bestTimeToVisit: "June - October",
  currency: "USD",
  language: "English, Swahili",
  timezone: "UTC+3",
  packages: [
    {
      id: "kenya-safari-7d",
      name: "Big Five Safari Adventure",
      duration: "7 Days / 6 Nights",
      description: "Track the Big Five across Masai Mara with expert guides and experience authentic African wilderness.",
      highlights: [
        "Game Drive with Expert Guides",
        "Visit Masai Villages",
        "Photography Opportunities",
        "Luxury Bush Lodges"
      ],
      inclusions: [
        "Luxury Safari Lodge",
        "Daily Game Drives (4x4 vehicles)",
        "Professional Naturalist Guides",
        "All Meals",
        "Masai Cultural Visit",
        "Binoculars and Field Guides"
      ],
      startingPrice: 3200,
      currency: "USD",
      image: "/images/kenya-hero.jpg",
      rating: 5,
      category: "adventure"
    }
  ]
};

// ============================================
// EXAMPLE 4: Luxury Group Destination (Caribbean)
// ============================================
export const exampleLuxuryDestination = {
  id: "bahamas",
  name: "Bahamas",
  country: "Bahamas",
  region: "caribbean" as const,
  tagline: "Island Paradise Awaits",
  description: "Experience the epitome of Caribbean luxury in the Bahamas. Enjoy pristine beaches, exclusive resorts, world-class dining, and endless water activities.",
  heroImage: "/images/bahamas-hero.jpg",
  galleryImages: [
    "/images/bahamas-1.jpg",
    "/images/bahamas-2.jpg",
    "/images/bahamas-3.jpg",
  ],
  highlights: [
    "Swimming with Dolphins",
    "Exuma Cays Adventure",
    "Blue Hole Exploration",
    "World-Class Beach Resorts"
  ],
  bestTimeToVisit: "December - April",
  currency: "USD",
  language: "English",
  timezone: "UTC-5",
  packages: [
    {
      id: "bahamas-luxury-6d",
      name: "Exclusive Bahamas Luxury Retreat",
      duration: "6 Days / 5 Nights",
      description: "An all-inclusive luxury experience featuring five-star accommodations, gourmet dining, and exclusive island activities.",
      highlights: [
        "5-Star Resort Stay",
        "Dolphin Encounter",
        "Private Beach Day",
        "Gourmet Dining"
      ],
      inclusions: [
        "Luxury Resort Suite",
        "All Meals and Premium Beverages",
        "Dolphin Swimming Tour",
        "Beach Excursion",
        "Airport Transfers",
        "Concierge Service",
        "Watersports Equipment"
      ],
      startingPrice: 4200,
      currency: "USD",
      image: "/images/bahamas-hero.jpg",
      rating: 5,
      category: "luxury"
    }
  ]
};

/**
 * MINIMAL EXAMPLE - Bare Bones (System Auto-Fills Rest)
 * You only need these 5 fields, everything else auto-generates!
 */
export const minimalDestination = {
  id: "minimal",
  name: "Minimal Example",
  country: "Country",
  region: "asia-pacific" as const,
  highlights: ["Attraction 1", "Attraction 2", "Attraction 3"],
  currency: "USD",
  language: "English",
  timezone: "UTC+0",
  
  // Auto-generated if missing:
  // - tagline, description (from name)
  // - heroImage, galleryImages (placeholder)
  // - bestTimeToVisit (defaults to "Year-round")
  
  packages: [
    {
      id: "minimal-tour",
      name: "Basic Tour Package",
      duration: "3 Days / 2 Nights",
      highlights: ["Place 1", "Place 2", "Place 3"],
      inclusions: ["Hotel", "Meals"],
      startingPrice: 500,
      currency: "USD",
      image: "/images/placeholder.jpg",
      rating: 3,
      category: "cultural"
      
      // Auto-generated if missing:
      // - description (from name)
      // - exclusions (standard list)
      // - itinerary (based on duration)
    }
  ]
};

/**
 * Copy-paste guide:
 * 1. Pick a template above (Example 1-3)
 * 2. Replace all values with your destination info
 * 3. Paste into destinations array in /lib/destinations-data.ts
 * 4. Add images to /public/images/
 * 5. Done! All pages auto-generate
 * 
 * For more examples, see:
 * - /lib/destinations-data.ts (Philippines, Bali, Japan, etc.)
 * - HOW_TO_ADD_DESTINATIONS.md (step-by-step guide)
 * - DESTINATION_CHECKLIST.md (quick reference)
 */
