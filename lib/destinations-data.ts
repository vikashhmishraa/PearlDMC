// PearlDMC Destinations Data - Global DMC
// Updated: All packages now have complete required fields
export interface ItineraryDay {
  day: number
  title: string
  description: string
  activities: string[]
  meals: string[]
  accommodation: string
}

export interface TourPackage {
  id: string
  name: string
  duration: string
  duration_days?: number
  description: string
  highlights: string[]
  inclusions: string[]
  exclusions: string[]
  itinerary: ItineraryDay[]
  startingPrice: number
  price_min?: number
  price_max?: number
  currency: string
  image: string
  rating: number
  category: "cultural" | "adventure" | "beach" | "luxury" | "honeymoon" | "group"
  photos?: Array<{
    id: string
    src: string
    alt: string
    category?: string
  }>
}

/**
 * Creates a default itinerary based on package duration
 */
function getDefaultItinerary(durationStr: string): ItineraryDay[] {
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

export interface Destination {
  id: string
  name: string
  country: string
  region: "asia-pacific" | "indian-ocean" | "africa" | "caribbean"
  tagline: string
  description: string
  heroImage: string
  image?: string
  galleryImages: string[]
  highlights: string[]
  bestTimeToVisit: string
  currency: string
  language: string
  timezone: string
  featured?: boolean
  packages: TourPackage[]
}

export const destinations: Destination[] = [
  {
    id: "philippines",
    name: "Philippines",
    country: "Philippines",
    region: "asia-pacific",
    tagline: "7,641 Islands of Paradise",
    description: "Discover a tropical archipelago where pristine beaches meet vibrant culture. From the stunning limestone cliffs of Palawan to the world-famous white sands of Boracay, the Philippines offers diverse experiences for every traveler.",
    heroImage: "/images/philippines-hero.jpg",
    image: "/images/philippines-hero.jpg",
    galleryImages: ["/images/boracay.jpg", "/images/cebu.jpg", "/images/bohol.jpg", "/images/siargao.jpg"],
    highlights: ["Palawan - World's Best Island", "Boracay White Beach", "Chocolate Hills of Bohol", "Cebu Whale Sharks", "Rice Terraces of Ifugao", "Siargao Surfing"],
    bestTimeToVisit: "November - May",
    currency: "PHP (Philippine Peso)",
    language: "Filipino, English",
    timezone: "GMT+8",
    packages: [
      {
        id: "ph-classic-10d",
        name: "Classic Philippines Discovery",
        description: "Explore the best of the Philippines with this comprehensive 10-day journey through iconic destinations. Visit the capital city of Manila, island-hop in Palawan, relax on the beautiful beaches of Boracay, and marvel at the famous Chocolate Hills of Bohol.",
        duration: "10 Days / 9 Nights",
        highlights: ["Manila City Tour", "Palawan Island Hopping", "Boracay Beach Stay", "Chocolate Hills Tour"],
        inclusions: ["4-Star Hotels", "Daily Breakfast", "Private Transfers", "English Guide", "Island Tours", "All Entrance Fees", "Travel Insurance"],
        exclusions: ["Flights to Philippines", "Meals not mentioned", "Personal expenses", "Tips and gratuities"],
        startingPrice: 1450,
        currency: "USD",
        image: "/images/boracay.jpg",
        rating: 5,
        category: "cultural",
        itinerary: [
          {
            day: 1,
            title: "Arrival in Manila",
            description: "Arrive at Ninoy Aquino International Airport and transfer to your 4-star hotel in Manila.",
            activities: ["Airport transfer", "Check-in", "City orientation"],
            meals: ["Dinner"],
            accommodation: "Manila 4-Star Hotel"
          },
          {
            day: 2,
            title: "Manila City Tour",
            description: "Full day exploring Manila's rich history and culture including Intramuros, Rizal Park, and National Museum.",
            activities: ["Intramuros Walking Tour", "Rizal Park", "National Museum", "San Agustin Church"],
            meals: ["Breakfast", "Lunch", "Dinner"],
            accommodation: "Manila 4-Star Hotel"
          },
          {
            day: 3,
            title: "Flight to Palawan",
            description: "Early morning flight to Puerto Princesa, Palawan. Afternoon at leisure and boat tour to Iwahig Firefly Watching.",
            activities: ["Domestic Flight", "Firefly Watching", "Sunset Cruise"],
            meals: ["Breakfast", "Lunch", "Dinner"],
            accommodation: "Palawan Resort"
          },
          {
            day: 4,
            title: "Puerto Princesa Underground River",
            description: "Visit the UNESCO-listed Puerto Princesa Underground River, one of the New 7 Wonders of Nature.",
            activities: ["Underground River Tour", "Honda Bay Snorkeling", "Island Hopping"],
            meals: ["Breakfast", "Lunch", "Dinner"],
            accommodation: "Palawan Resort"
          },
          {
            day: 5,
            title: "El Nido Island Hopping",
            description: "Travel to El Nido and enjoy island hopping with visits to Bacuit Lagoon, Secret Lagoon, and pristine beaches.",
            activities: ["Island Hopping Tour", "Lagoon Swimming", "Snorkeling", "Beach Activities"],
            meals: ["Breakfast", "Lunch", "Dinner"],
            accommodation: "El Nido Boutique Resort"
          },
          {
            day: 6,
            title: "Flight to Boracay",
            description: "Fly to Boracay and check into beachfront resort. Evening beach walk and sunset.",
            activities: ["Domestic Flight", "Beach Walk", "Sunset Viewing"],
            meals: ["Breakfast", "Lunch", "Dinner"],
            accommodation: "Boracay Beach Resort"
          },
          {
            day: 7,
            title: "Boracay Beach & Water Sports",
            description: "Full day beach activities including parasailing, jet skiing, and evening beach party.",
            activities: ["Water Sports", "Beach Activities", "Sunset Party"],
            meals: ["Breakfast", "Lunch", "Dinner"],
            accommodation: "Boracay Beach Resort"
          },
          {
            day: 8,
            title: "Bohol - Chocolate Hills",
            description: "Travel to Bohol and tour the famous Chocolate Hills, Tarsier Sanctuary, and Loboc River cruise.",
            activities: ["Chocolate Hills Tour", "Tarsier Sanctuary", "Loboc River Cruise", "Hanging Bridge"],
            meals: ["Breakfast", "Lunch", "Dinner"],
            accommodation: "Bohol Resort"
          },
          {
            day: 9,
            title: "Bohol Beach & Leisure",
            description: "Free day at beach to relax or optional activities like snorkeling and island hopping.",
            activities: ["Beach Relaxation", "Optional Snorkeling", "Market Visit"],
            meals: ["Breakfast", "Lunch", "Dinner"],
            accommodation: "Bohol Resort"
          },
          {
            day: 10,
            title: "Departure",
            description: "Transfer to airport for departure flight. Journey ends with wonderful memories.",
            activities: ["Check-out", "Airport Transfer"],
            meals: ["Breakfast"],
            accommodation: "Airport Transfer"
          }
        ]
      },
      {
        id: "ph-palawan-5d",
        name: "Palawan Paradise Escape",
        description: "Experience the untouched beauty of Palawan with this 5-day escape focusing on the must-see attractions. Explore the underground river, island-hop in El Nido, and discover hidden lagoons.",
        duration: "5 Days / 4 Nights",
        highlights: ["El Nido Island Tours", "Underground River", "Puerto Princesa", "Hidden Lagoons"],
        inclusions: ["Boutique Resort", "All Meals", "Boat Tours", "Park Fees", "Airport Transfers", "Travel Insurance"],
        exclusions: ["Flights to Philippines", "Personal equipment", "Optional activities", "Tips"],
        startingPrice: 890,
        currency: "USD",
        image: "/images/philippines-hero.jpg",
        rating: 5,
        category: "beach",
        itinerary: [
          {
            day: 1,
            title: "Arrival in Puerto Princesa",
            description: "Arrive at Puerto Princesa airport and transfer to boutique resort. Evening beach relaxation.",
            activities: ["Airport Transfer", "Check-in", "Beach Time"],
            meals: ["Dinner"],
            accommodation: "Palawan Boutique Resort"
          },
          {
            day: 2,
            title: "Puerto Princesa Underground River",
            description: "Full day exploring the UNESCO-listed Puerto Princesa Underground River and Sabang Beach.",
            activities: ["Underground River Tour", "Sabang Beach", "Local lunch"],
            meals: ["Breakfast", "Lunch", "Dinner"],
            accommodation: "Palawan Boutique Resort"
          },
          {
            day: 3,
            title: "El Nido Island Hopping",
            description: "Travel to El Nido and island hop through Bacuit Lagoon, Secret Lagoon, and pristine beaches.",
            activities: ["Island Hopping", "Snorkeling", "Beach Swimming", "Sunset"],
            meals: ["Breakfast", "Lunch", "Dinner"],
            accommodation: "El Nido Boutique Resort"
          },
          {
            day: 4,
            title: "Hidden Lagoons & Beach Bliss",
            description: "Explore hidden lagoons and secluded beaches around El Nido. Swimming and relaxation.",
            activities: ["Lagoon Tour", "Rock Climbing", "Beach Exploration", "Photography"],
            meals: ["Breakfast", "Lunch", "Dinner"],
            accommodation: "El Nido Boutique Resort"
          },
          {
            day: 5,
            title: "Departure",
            description: "Transfer to airport for departure with unforgettable memories.",
            activities: ["Check-out", "Airport Transfer"],
            meals: ["Breakfast"],
            accommodation: "Airport Transfer"
          }
        ]
      },
      {
        id: "ph-adventure-8d",
        name: "Philippine Adventure Trail",
        description: "Experience thrilling adventures across the Philippines with water sports, canyoneering, and wildlife encounters. This 8-day journey combines adrenaline-pumping activities with cultural exploration.",
        duration: "8 Days / 7 Nights",
        highlights: ["Siargao Surfing", "Cebu Canyoneering", "Bohol Tarsier Sanctuary", "Kawasan Falls"],
        inclusions: ["3-Star Hotels", "Daily Breakfast", "Activity Fees", "Guide Services", "Transfers"],
        exclusions: ["International flights", "Travel insurance", "Personal expenses", "Tips"],
        startingPrice: 1180,
        currency: "USD",
        image: "/images/cebu.jpg",
        rating: 4,
        category: "adventure",
        itinerary: []
      },
      {
        id: "ph-luxury-7d",
        name: "Luxury Philippine Retreat",
        description: "Indulge in supreme luxury across the Philippines with world-class resorts, private yacht tours, and bespoke experiences. Experience paradise in ultimate comfort.",
        duration: "7 Days / 6 Nights",
        highlights: ["5-Star Resorts", "Private Island Tour", "Spa Treatments", "Fine Dining"],
        inclusions: ["Luxury Resorts", "Full Board", "Private Yacht", "Butler Service", "VIP Transfers"],
        exclusions: ["International flights", "Shopping", "Optional activities", "Tips"],
        startingPrice: 3200,
        currency: "USD",
        image: "/images/boracay.jpg",
        rating: 5,
        category: "luxury",
        itinerary: []
      },
      {
        id: "ph-honeymoon-6d",
        name: "Romantic Philippines Honeymoon",
        description: "Celebrate your love in paradise with romantic sunsets, private dinners, and couples spa treatments. Create unforgettable memories on your honeymoon.",
        duration: "6 Days / 5 Nights",
        highlights: ["Beachfront Suite", "Sunset Cruise", "Couples Spa", "Private Dinner"],
        inclusions: ["Premium Resort", "Romance Package", "Champagne", "Photographer", "Transfers"],
        exclusions: ["International flights", "Personal shopping", "Extra dining", "Tips"],
        startingPrice: 2100,
        currency: "USD",
        image: "/images/philippines-hero.jpg",
        rating: 5,
        category: "honeymoon",
        itinerary: [],
        photos: [
          { id: "ph-1", src: "/images/philippines-hero.jpg", alt: "Sunset Beach Paradise", category: "Beach" },
          { id: "ph-2", src: "/images/bali.jpg", alt: "Romantic Beachfront Resort", category: "Accommodation" },
          { id: "ph-3", src: "/images/boracay.jpg", alt: "Crystal Clear Waters", category: "Beach" },
          { id: "ph-4", src: "/images/cebu.jpg", alt: "Tropical Paradise View", category: "Scenery" },
          { id: "ph-5", src: "/images/south-korea.jpg", alt: "Sunset Dinner Setup", category: "Dining" },
          { id: "ph-6", src: "/images/japan.jpg", alt: "Couples Spa Treatment", category: "Wellness" }
        ]
      }
    ]
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "asia-pacific",
    tagline: "Island of the Gods",
    description: "Experience the magic of Bali - an island where ancient temples rise above emerald rice terraces, where the artistic traditions of dance and craft flourish, and where world-class beaches meet spiritual serenity.",
    heroImage: "/images/bali.jpg",
    image: "/images/bali.jpg",
    galleryImages: ["/images/bali.jpg"],
    highlights: ["Ubud Art & Culture", "Tanah Lot Temple", "Rice Terraces", "Beach Clubs", "Mount Batur Sunrise", "Nusa Penida"],
    bestTimeToVisit: "April - October",
    currency: "IDR (Indonesian Rupiah)",
    language: "Indonesian, Balinese",
    timezone: "GMT+8",
    packages: [
      {
        id: "bali-cultural-7d",
        name: "Bali Cultural Immersion",
        description: "Dive deep into Balinese culture with visits to ancient temples, traditional ceremonies, and local villages. Discover the soul of Bali.",
        duration: "7 Days / 6 Nights",
        highlights: ["Ubud Palace", "Tanah Lot Temple", "Traditional Ceremonies", "Balinese Village Life"],
        inclusions: ["4-Star Hotels", "Daily Breakfast", "Cultural Tours", "Local Guides", "Transfers"],
        exclusions: ["International flights", "Meals outside itinerary", "Personal expenses", "Tips"],
        startingPrice: 950,
        currency: "USD",
        image: "/images/bali.jpg",
        rating: 5,
        category: "cultural",
        itinerary: []
      },
      {
        id: "bali-adventure-6d",
        name: "Bali Adventure Expedition",
        description: "Adventure seekers welcome! Experience surfing, diving, trekking volcanoes, and jungle exploration in beautiful Bali.",
        duration: "6 Days / 5 Nights",
        highlights: ["Bali Volcano Trek", "Diving Expeditions", "Surfing Lessons", "Jungle Treks"],
        inclusions: ["Resort Accommodation", "Breakfast Daily", "Activity Fees", "Equipment Rental", "Transfers"],
        exclusions: ["International flights", "Travel insurance", "Optional activities", "Tips"],
        startingPrice: 1100,
        currency: "USD",
        image: "/images/bali.jpg",
        rating: 4,
        category: "adventure",
        itinerary: []
      },
      {
        id: "bali-luxury-8d",
        name: "Bali Luxury Paradise",
        description: "Experience ultimate luxury in Bali with 5-star resorts, private beach clubs, spa retreats, and fine dining experiences.",
        duration: "8 Days / 7 Nights",
        highlights: ["Luxury Resorts", "Private Beaches", "Spa & Wellness", "Gourmet Dining"],
        inclusions: ["Luxury Resorts", "All Meals", "Spa Credits", "Private Transportation", "Concierge"],
        exclusions: ["International flights", "Extra shopping", "Personal items", "Tips"],
        startingPrice: 2800,
        currency: "USD",
        image: "/images/bali.jpg",
        rating: 5,
        category: "luxury",
        itinerary: []
      },
      {
        id: "bali-honeymoon-5d",
        name: "Bali Romantic Getaway",
        description: "Perfect for honeymooners! Romantic dinners, couple's massage, sunset views, and beachfront bliss await you in Bali.",
        duration: "5 Days / 4 Nights",
        highlights: ["Beachfront Resort", "Couples Spa", "Sunset Dinners", "Private Beach"],
        inclusions: ["Premium Resort", "Romance Package", "Spa Services", "Dinners", "Transfers"],
        exclusions: ["International flights", "Extra activities", "Personal expenses", "Tips"],
        startingPrice: 1650,
        currency: "USD",
        image: "/images/bali.jpg",
        rating: 5,
        category: "honeymoon",
        itinerary: []
      }
    ]
  },
  {
    id: "japan",
    name: "Japan",
    country: "Japan",
    region: "asia-pacific",
    tagline: "Where Tradition Meets Tomorrow",
    description: "From the neon-lit streets of Tokyo to the serene temples of Kyoto, Japan offers an extraordinary journey through time. Experience the perfect harmony of ancient traditions and cutting-edge innovation.",
    heroImage: "/images/japan.jpg",
    image: "/images/japan.jpg",
    galleryImages: ["/images/japan.jpg"],
    highlights: ["Tokyo Metropolis", "Mount Fuji", "Kyoto Temples", "Cherry Blossoms", "Osaka Food Scene", "Traditional Ryokans"],
    bestTimeToVisit: "March - May, September - November",
    currency: "JPY (Japanese Yen)",
    language: "Japanese",
    timezone: "GMT+9",
    packages: [
      {
        id: "japan-classic-10d",
        name: "Classic Japan Discovery",
        description: "Journey through Japan's highlights from Tokyo's neon lights to Kyoto's ancient temples. A complete Japanese experience.",
        duration: "10 Days / 9 Nights",
        highlights: ["Tokyo", "Mount Fuji", "Kyoto Temples", "Osaka Castle"],
        inclusions: ["Hotels", "Daily Breakfast", "JR Pass", "Local Guides", "Transfers"],
        exclusions: ["International flights", "Meals outside itinerary", "Personal expenses", "Tips"],
        startingPrice: 2100,
        currency: "USD",
        image: "/images/japan.jpg",
        rating: 5,
        category: "cultural",
        itinerary: []
      },
      {
        id: "japan-cherry-8d",
        name: "Cherry Blossom Festival Tour",
        description: "Experience Japan's most magical season with cherry blossoms, cultural festivals, and traditional experiences.",
        duration: "8 Days / 7 Nights",
        highlights: ["Cherry Blossoms", "Festival Tours", "Traditional Tea", "Shrine Visits"],
        inclusions: ["Hotels", "Breakfast", "Festival Tickets", "Guides", "Transfers"],
        exclusions: ["International flights", "Extra meals", "Personal items", "Tips"],
        startingPrice: 1850,
        currency: "USD",
        image: "/images/japan.jpg",
        rating: 5,
        category: "cultural",
        itinerary: []
      },
      {
        id: "japan-luxury-12d",
        name: "Luxury Japan Experience",
        description: "Experience Japan's finest with luxury accommodations, private tours, and exclusive cultural experiences.",
        duration: "12 Days / 11 Nights",
        highlights: ["5-Star Hotels", "Private Tours", "Michelin Dining", "Exclusive Experiences"],
        inclusions: ["Luxury Hotels", "All Meals", "Private Guides", "First Class Transport", "Concierge"],
        exclusions: ["International flights", "Shopping", "Personal expenses", "Tips"],
        startingPrice: 4500,
        currency: "USD",
        image: "/images/japan.jpg",
        rating: 5,
        category: "luxury",
        itinerary: []
      },
      {
        id: "japan-adventure-7d",
        name: "Japan Active Adventure",
        description: "For adventure seekers! Hiking, skiing, water sports, and outdoor activities across beautiful Japan.",
        duration: "7 Days / 6 Nights",
        highlights: ["Mountain Hiking", "Skiing", "Water Sports", "Outdoor Activities"],
        inclusions: ["Hotels", "Breakfast", "Equipment Rental", "Guides", "Transfers"],
        exclusions: ["International flights", "Travel insurance", "Optional activities", "Tips"],
        startingPrice: 1650,
        currency: "USD",
        image: "/images/japan.jpg",
        rating: 4,
        category: "adventure",
        itinerary: []
      }
    ]
  },
  {
    id: "south-korea",
    name: "South Korea",
    country: "South Korea",
    region: "asia-pacific",
    tagline: "Dynamic Spirit of Asia",
    description: "Discover the land of K-pop, kimchi, and centuries-old palaces. South Korea seamlessly blends ultra-modern cities with tranquil temples, offering travelers a unique cultural experience.",
    heroImage: "/images/south-korea.jpg",
    image: "/images/south-korea.jpg",
    galleryImages: ["/images/south-korea.jpg"],
    highlights: ["Seoul Palaces", "K-Pop Culture", "Jeju Island", "DMZ Tour", "Korean Cuisine", "Traditional Hanbok"],
    bestTimeToVisit: "April - June, September - November",
    currency: "KRW (Korean Won)",
    language: "Korean",
    timezone: "GMT+9",
    packages: [
      {
        id: "korea-classic-7d",
        name: "Classic Korea Tour",
        description: "Explore Seoul's vibrant culture, ancient temples, and modern attractions. Experience the best of South Korea.",
        duration: "7 Days / 6 Nights",
        highlights: ["Seoul City", "Gyeongbokgung Palace", "DMZ Tour", "Traditional Markets"],
        inclusions: ["Hotels", "Daily Breakfast", "Tours", "Guides", "Transfers"],
        exclusions: ["International flights", "Meals outside itinerary", "Personal items", "Tips"],
        startingPrice: 1380,
        currency: "USD",
        image: "/images/south-korea.jpg",
        rating: 4,
        category: "cultural",
        itinerary: []
      },
      {
        id: "korea-kpop-5d",
        name: "K-Pop & Culture Tour",
        description: "For K-Pop fans! Visit K-pop studios, enjoy hanbok experiences, and explore K-drama filming locations.",
        duration: "5 Days / 4 Nights",
        highlights: ["K-Pop Studio Visit", "Hanbok Experience", "K-Drama Locations", "Shopping"],
        inclusions: ["3-Star Hotels", "Breakfast", "K-Pop Experience", "Guide", "Transfers"],
        exclusions: ["International flights", "Shopping", "Personal items", "Tips"],
        startingPrice: 950,
        currency: "USD",
        image: "/images/south-korea.jpg",
        rating: 4,
        category: "cultural",
        itinerary: []
      },
      {
        id: "korea-jeju-4d",
        name: "Jeju Island Escape",
        description: "Relax on beautiful Jeju Island with volcanic landscapes, scenic beaches, and natural wonders.",
        duration: "4 Days / 3 Nights",
        highlights: ["Jeju Volcanic Island", "Beach Resort", "Lava Tubes", "Waterfalls"],
        inclusions: ["Resort Stay", "Half Board", "Tours", "Domestic Flights", "Transfers"],
        exclusions: ["International flights", "Extra activities", "Personal items", "Tips"],
        startingPrice: 780,
        currency: "USD",
        image: "/images/south-korea.jpg",
        rating: 4,
        category: "beach",
        itinerary: []
      }
    ]
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    region: "indian-ocean",
    tagline: "Paradise on Earth",
    description: "The Maldives is the ultimate tropical escape - a string of pristine islands scattered across the Indian Ocean. Crystal-clear lagoons, world-class diving, and overwater villas create an unforgettable paradise.",
    heroImage: "/images/maldives.jpg",
    image: "/images/maldives.jpg",
    galleryImages: ["/images/maldives.jpg"],
    highlights: ["Overwater Villas", "World-Class Diving", "Private Islands", "Underwater Restaurant", "Dolphin Watching", "Spa Retreats"],
    bestTimeToVisit: "November - April",
    currency: "MVR (Maldivian Rufiyaa)",
    language: "Dhivehi, English",
    timezone: "GMT+5",
    packages: [
      {
        id: "maldives-luxury-5d",
        name: "Maldives Luxury Escape",
        description: "Escape to paradise with overwater villas, pristine lagoons, and world-class diving in the Maldives.",
        duration: "5 Days / 4 Nights",
        highlights: ["Overwater Villa", "Private Beach", "Snorkeling", "Sunset Cruise"],
        inclusions: ["5-Star Resort", "Full Board", "Speedboat Transfers", "Water Sports", "Spa Credit"],
        exclusions: ["International flights", "Extra activities", "Personal shopping", "Tips"],
        startingPrice: 2800,
        currency: "USD",
        image: "/images/maldives.jpg",
        rating: 5,
        category: "luxury",
        itinerary: []
      },
      {
        id: "maldives-honeymoon-7d",
        name: "Maldives Honeymoon Paradise",
        description: "Perfect honeymoon destination with romantic dinners, couples spa, and private excursions in the Maldives.",
        duration: "7 Days / 6 Nights",
        highlights: ["Premium Water Villa", "Romantic Dinner", "Couples Spa", "Private Excursion"],
        inclusions: ["Luxury Resort", "All Meals", "Speedboat", "Couple Treatments", "Activities"],
        exclusions: ["International flights", "Extra shopping", "Personal items", "Tips"],
        startingPrice: 3500,
        currency: "USD",
        image: "/images/maldives.jpg",
        rating: 5,
        category: "honeymoon",
        itinerary: []
      },
      {
        id: "maldives-diving-6d",
        name: "Maldives Diving Adventure",
        description: "For diving enthusiasts! Explore world-class dive sites and vibrant marine life in the Maldives.",
        duration: "6 Days / 5 Nights",
        highlights: ["Diving Expeditions", "Coral Reefs", "Manta Ray Season", "Shark Species"],
        inclusions: ["Resort", "Breakfast", "Daily Dives", "Equipment", "Certifications"],
        exclusions: ["International flights", "Extra dives", "Personal gear", "Tips"],
        startingPrice: 2200,
        currency: "USD",
        image: "/images/maldives.jpg",
        rating: 5,
        category: "adventure",
        itinerary: []
      },
      {
        id: "maldives-family-6d",
        name: "Maldives Family Holiday",
        description: "Family-friendly Maldives vacation with activities for all ages, kids clubs, and water sports.",
        duration: "6 Days / 5 Nights",
        highlights: ["Family Activities", "Kids Club", "Beach Fun", "Water Sports"],
        inclusions: ["Resorts", "Half Board", "Activities", "Transfers", "Entertainment"],
        exclusions: ["International flights", "Premium meals", "Personal items", "Tips"],
        startingPrice: 1980,
        currency: "USD",
        image: "/images/maldives.jpg",
        rating: 4,
        category: "group",
        itinerary: []
      }
    ]
  },
  {
    id: "mauritius",
    name: "Mauritius",
    country: "Mauritius",
    region: "indian-ocean",
    tagline: "Paradise Island in the Indian Ocean",
    description: "Mauritius offers the perfect blend of beaches, mountains, and multicultural heritage. From the dramatic Le Morne to colorful Port Louis markets, this island nation captivates every visitor.",
    heroImage: "/images/mauritius.jpg",
    image: "/images/mauritius.jpg",
    galleryImages: ["/images/mauritius.jpg"],
    highlights: ["Le Morne Peninsula", "Chamarel Seven Colored Earth", "Port Louis", "Ile aux Cerfs", "Black River Gorges", "Rum Distilleries"],
    bestTimeToVisit: "May - December",
    currency: "MUR (Mauritian Rupee)",
    language: "English, French, Creole",
    timezone: "GMT+4",
    packages: [
      {
        id: "mauritius-classic-7d",
        name: "Mauritius Classic Discovery",
        description: "Explore Mauritius with beach relaxation, cultural experiences, and adventure activities.",
        duration: "7 Days / 6 Nights",
        highlights: ["Le Morne Beach", "Port Louis", "Trou aux Cerfs", "Coral Reefs"],
        inclusions: ["Hotels", "Daily Breakfast", "Tours", "Guides", "Transfers"],
        exclusions: ["International flights", "Meals outside itinerary", "Personal items", "Tips"],
        startingPrice: 1280,
        currency: "USD",
        image: "/images/mauritius.jpg",
        rating: 4,
        category: "beach",
        itinerary: []
      },
      {
        id: "mauritius-honeymoon-6d",
        name: "Mauritius Romantic Escape",
        description: "Romantic honeymoon in Mauritius with beachfront resorts, private dinners, and sunset cruises.",
        duration: "6 Days / 5 Nights",
        highlights: ["Beachfront Resort", "Private Dinners", "Sunset Cruise", "Couple Spa"],
        inclusions: ["Premium Resort", "Romance Package", "Cruises", "Spa", "Transfers"],
        exclusions: ["International flights", "Extra meals", "Personal items", "Tips"],
        startingPrice: 1950,
        currency: "USD",
        image: "/images/mauritius.jpg",
        rating: 5,
        category: "honeymoon",
        itinerary: []
      },
      {
        id: "mauritius-adventure-5d",
        name: "Mauritius Adventure Package",
        description: "Adventure seekers paradise with hiking, water sports, and island exploration in Mauritius.",
        duration: "5 Days / 4 Nights",
        highlights: ["Hiking Tours", "Snorkeling", "Island Hopping", "Water Sports"],
        inclusions: ["Hotels", "Breakfast", "Activity Fees", "Equipment", "Transfers"],
        exclusions: ["International flights", "Travel insurance", "Personal items", "Tips"],
        startingPrice: 1050,
        currency: "USD",
        image: "/images/mauritius.jpg",
        rating: 4,
        category: "adventure",
        itinerary: []
      }
    ]
  },
  {
    id: "seychelles",
    name: "Seychelles",
    country: "Seychelles",
    region: "indian-ocean",
    tagline: "Unspoiled Natural Beauty",
    description: "The Seychelles archipelago offers some of the world's most beautiful beaches, framed by ancient granite boulders and lush tropical forests. A true Garden of Eden in the Indian Ocean.",
    heroImage: "/images/seychelles.jpg",
    image: "/images/seychelles.jpg",
    galleryImages: ["/images/seychelles.jpg"],
    highlights: ["Anse Source d'Argent", "Vallée de Mai", "Giant Tortoises", "Praslin Island", "La Digue", "Marine Parks"],
    bestTimeToVisit: "April - May, October - November",
    currency: "SCR (Seychellois Rupee)",
    language: "English, French, Creole",
    timezone: "GMT+4",
    packages: [
      {
        id: "seychelles-island-8d",
        name: "Seychelles Island Hopping",
        description: "Island hop through Seychelles' pristine islands with stunning beaches, granite boulders, and tropical scenery.",
        duration: "8 Days / 7 Nights",
        highlights: ["Anse Source d'Argent", "Island Hopping", "Snorkeling", "Whale Shark Tours"],
        inclusions: ["Hotels", "Daily Breakfast", "Boat Tours", "Guides", "Transfers"],
        exclusions: ["International flights", "Meals outside itinerary", "Personal items", "Tips"],
        startingPrice: 1680,
        currency: "USD",
        image: "/images/seychelles.jpg",
        rating: 5,
        category: "beach",
        itinerary: []
      },
      {
        id: "seychelles-luxury-6d",
        name: "Seychelles Luxury Retreat",
        description: "Ultra-luxury Seychelles experience with exclusive resorts, private beaches, and personalized services.",
        duration: "6 Days / 5 Nights",
        highlights: ["Luxury Resort", "Private Beach", "Spa & Wellness", "Gourmet Dining"],
        inclusions: ["Luxury Hotels", "All Meals", "Spa Services", "Private Tours", "Concierge"],
        exclusions: ["International flights", "Extra shopping", "Personal items", "Tips"],
        startingPrice: 3200,
        currency: "USD",
        image: "/images/seychelles.jpg",
        rating: 5,
        category: "luxury",
        itinerary: []
      },
      {
        id: "seychelles-honeymoon-7d",
        name: "Seychelles Honeymoon Bliss",
        description: "Perfect honeymoon in Seychelles with romantic settings, private dinners, and island excursions.",
        duration: "7 Days / 6 Nights",
        highlights: ["Private Villa", "Romantic Dinner", "Island Cruise", "Couples Spa"],
        inclusions: ["Premium Resort", "Romance Package", "Boat Tours", "Treatments", "Transfers"],
        exclusions: ["International flights", "Extra meals", "Personal items", "Tips"],
        startingPrice: 2680,
        currency: "USD",
        image: "/images/seychelles.jpg",
        rating: 5,
        category: "honeymoon",
        itinerary: []
      }
    ]
  },
  {
    id: "south-africa",
    name: "South Africa",
    country: "South Africa",
    region: "africa",
    tagline: "A World in One Country",
    description: "From Table Mountain to Kruger's Big Five, from world-class vineyards to vibrant cities - South Africa offers extraordinary diversity in landscapes, wildlife, and experiences.",
    heroImage: "/images/south-africa.jpg",
    image: "/images/south-africa.jpg",
    galleryImages: ["/images/south-africa.jpg"],
    highlights: ["Cape Town", "Table Mountain", "Kruger Safari", "Garden Route", "Wine Country", "Johannesburg"],
    bestTimeToVisit: "May - September (Safari), October - March (Cape Town)",
    currency: "ZAR (South African Rand)",
    language: "English, Afrikaans, Zulu",
    timezone: "GMT+2",
    packages: [
      {
        id: "sa-classic-12d",
        name: "South Africa Classic Tour",
        description: "Comprehensive South Africa experience with Table Mountain, safari, wine regions, and cultural sites.",
        duration: "12 Days / 11 Nights",
        highlights: ["Table Mountain", "Kruger Safari", "Wine Country", "Cape Town"],
        inclusions: ["Hotels", "Daily Breakfast", "Tours", "Guides", "Transfers"],
        exclusions: ["International flights", "Meals outside itinerary", "Personal items", "Tips"],
        startingPrice: 2450,
        currency: "USD",
        image: "/images/south-africa.jpg",
        rating: 5,
        category: "cultural",
        itinerary: []
      },
      {
        id: "sa-safari-7d",
        name: "South African Safari Adventure",
        description: "Experience the Big Five and incredible wildlife in Kruger National Park with expert guides.",
        duration: "7 Days / 6 Nights",
        highlights: ["Big Five Safari", "Game Drives", "Bush Walks", "Wildlife Photography"],
        inclusions: ["Safari Lodge", "All Meals", "Game Drives", "Naturalist Guides", "Transfers"],
        exclusions: ["International flights", "Travel insurance", "Personal items", "Tips"],
        startingPrice: 1850,
        currency: "USD",
        image: "/images/south-africa.jpg",
        rating: 5,
        category: "adventure",
        itinerary: []
      },
      {
        id: "sa-cape-6d",
        name: "Cape Town & Coast Discovery",
        description: "Explore Cape Town's iconic landmarks, coastal beauty, and cultural attractions.",
        duration: "6 Days / 5 Nights",
        highlights: ["Table Mountain", "Cape Point", "Penguins Colony", "Wine Tasting"],
        inclusions: ["Hotels", "Breakfast", "Tours", "Attractions", "Transfers"],
        exclusions: ["International flights", "Extra meals", "Personal items", "Tips"],
        startingPrice: 1320,
        currency: "USD",
        image: "/images/south-africa.jpg",
        rating: 4,
        category: "cultural",
        itinerary: []
      },
      {
        id: "sa-luxury-10d",
        name: "South Africa Luxury Journey",
        description: "Ultimate luxury South Africa experience with 5-star lodges, private tours, and exclusive access.",
        duration: "10 Days / 9 Nights",
        highlights: ["Luxury Lodges", "Private Safari", "Fine Dining", "Spa Retreats"],
        inclusions: ["Luxury Resorts", "All Meals", "Private Guides", "Premium Activities", "Transfers"],
        exclusions: ["International flights", "Shopping", "Personal items", "Tips"],
        startingPrice: 4200,
        currency: "USD",
        image: "/images/south-africa.jpg",
        rating: 5,
        category: "luxury",
        itinerary: []
      }
    ]
  },
  {
    id: "zanzibar",
    name: "Zanzibar",
    country: "Tanzania",
    region: "africa",
    tagline: "Spice Island Paradise",
    description: "Zanzibar enchants with its mix of African, Arab, and Indian influences. Explore UNESCO-listed Stone Town, relax on powder-white beaches, and discover the aromatic spice plantations.",
    heroImage: "/images/zanzibar.jpg",
    image: "/images/zanzibar.jpg",
    galleryImages: ["/images/zanzibar.jpg"],
    highlights: ["Stone Town", "Spice Tours", "Nungwi Beach", "Jozani Forest", "Prison Island", "Dhow Cruises"],
    bestTimeToVisit: "June - October, December - February",
    currency: "TZS (Tanzanian Shilling)",
    language: "Swahili, English",
    timezone: "GMT+3",
    packages: [
      {
        id: "zanzibar-classic-6d",
        name: "Zanzibar Classic Discovery",
        description: "Explore Zanzibar's rich history, pristine beaches, and Swahili culture with Stone Town tours and island hopping.",
        duration: "6 Days / 5 Nights",
        highlights: ["Stone Town", "Spice Tours", "Beach Resorts", "Island Hopping"],
        inclusions: ["Hotels", "Daily Breakfast", "Tours", "Guides", "Transfers"],
        exclusions: ["International flights", "Meals outside itinerary", "Personal items", "Tips"],
        startingPrice: 1150,
        currency: "USD",
        image: "/images/zanzibar.jpg",
        rating: 4,
        category: "cultural",
        itinerary: []
      },
      {
        id: "zanzibar-beach-5d",
        name: "Zanzibar Beach Paradise",
        description: "Beach lover's paradise with pristine white sand beaches, crystal-clear waters, and snorkeling adventures.",
        duration: "5 Days / 4 Nights",
        highlights: ["White Sand Beaches", "Snorkeling", "Water Sports", "Sunset Cruises"],
        inclusions: ["Beach Resort", "Half Board", "Water Activities", "Tours", "Transfers"],
        exclusions: ["International flights", "Premium meals", "Personal items", "Tips"],
        startingPrice: 950,
        currency: "USD",
        image: "/images/zanzibar.jpg",
        rating: 4,
        category: "beach",
        itinerary: []
      },
      {
        id: "zanzibar-honeymoon-7d",
        name: "Zanzibar Honeymoon Escape",
        description: "Romantic honeymoon in Zanzibar with private beachfront villas, sunset dinners, and couple experiences.",
        duration: "7 Days / 6 Nights",
        highlights: ["Private Beach Villa", "Romantic Dinners", "Spa Treatments", "Island Excursions"],
        inclusions: ["Premium Resort", "Romance Package", "Spa Services", "Boat Tours", "Transfers"],
        exclusions: ["International flights", "Extra meals", "Personal items", "Tips"],
        startingPrice: 1820,
        currency: "USD",
        image: "/images/zanzibar.jpg",
        rating: 5,
        category: "honeymoon",
        itinerary: []
      }
    ]
  },
  {
    id: "jamaica",
    name: "Jamaica",
    country: "Jamaica",
    region: "caribbean",
    tagline: "Feel the Rhythm of the Caribbean",
    description: "Jamaica pulses with life - from reggae rhythms to cascading waterfalls, from jerk-spiced cuisine to pristine beaches. Experience the warmth of the Caribbean's most vibrant island.",
    heroImage: "/images/jamaica.jpg",
    galleryImages: ["/images/jamaica.jpg"],
    highlights: ["Dunn's River Falls", "Montego Bay", "Negril Beach", "Blue Mountains", "Bob Marley Trail", "Rick's Cafe"],
    bestTimeToVisit: "November - Mid-December, Mid-January - April",
    currency: "JMD (Jamaican Dollar)",
    language: "English, Patois",
    timezone: "GMT-5",
    packages: [
      {
        id: "jamaica-classic-7d",
        name: "Jamaica Classic Tour",
        description: "Discover Jamaica with vibrant culture, stunning waterfalls, reggae heritage, and Caribbean beaches.",
        duration: "7 Days / 6 Nights",
        highlights: ["Dunn's River Falls", "Montego Bay", "Bob Marley Museum", "Coral Gardens"],
        inclusions: ["Hotels", "Daily Breakfast", "Tours", "Guides", "Transfers"],
        exclusions: ["International flights", "Meals outside itinerary", "Personal items", "Tips"],
        startingPrice: 1380,
        currency: "USD",
        image: "/images/jamaica.jpg",
        rating: 4,
        category: "cultural",
        itinerary: []
      },
      {
        id: "jamaica-adventure-6d",
        name: "Jamaica Adventure Experience",
        description: "Action-packed Jamaica adventure with zip-lining, cave exploration, river rafting, and water sports.",
        duration: "6 Days / 5 Nights",
        highlights: ["Zip-Lining", "Cave Tubing", "Rafting", "Water Sports"],
        inclusions: ["Hotels", "Breakfast", "Activity Fees", "Equipment", "Transfers"],
        exclusions: ["International flights", "Travel insurance", "Personal items", "Tips"],
        startingPrice: 1150,
        currency: "USD",
        image: "/images/jamaica.jpg",
        rating: 4,
        category: "adventure",
        itinerary: []
      },
      {
        id: "jamaica-luxury-8d",
        name: "Jamaica Luxury Escape",
        description: "Luxury Jamaica experience with 5-star resorts, private beaches, spa treatments, and exclusive tours.",
        duration: "8 Days / 7 Nights",
        highlights: ["Luxury Resorts", "Private Beach", "Spa & Wellness", "Fine Dining"],
        inclusions: ["Luxury Hotels", "All Meals", "Spa Services", "Private Tours", "Transfers"],
        exclusions: ["International flights", "Extra shopping", "Personal items", "Tips"],
        startingPrice: 2950,
        currency: "USD",
        image: "/images/jamaica.jpg",
        rating: 5,
        category: "luxury",
        itinerary: []
      },
      {
        id: "jamaica-honeymoon-6d",
        name: "Jamaica Romantic Honeymoon",
        description: "Romantic Caribbean honeymoon in Jamaica with beachfront resorts, sunset cruises, and couple experiences.",
        duration: "6 Days / 5 Nights",
        highlights: ["Beachfront Resort", "Sunset Cruise", "Couple Spa", "Private Dinner"],
        inclusions: ["Premium Resort", "Romance Package", "Spa Treatments", "Cruises", "Transfers"],
        exclusions: ["International flights", "Extra meals", "Personal items", "Tips"],
        startingPrice: 1780,
        currency: "USD",
        image: "/images/jamaica.jpg",
        rating: 5,
        category: "honeymoon",
        itinerary: []
      }
    ]
  }
]

export const getDestinationById = (id: string): Destination | undefined => {
  const dest = destinations.find(d => d.id === id);
  if (!dest) return undefined;
  
  // Normalize all packages to ensure they have required fields
  return {
    ...dest,
    packages: dest.packages.map(pkg => normalizePackage(pkg))
  };
}

export const getDestinationsByRegion = (region: Destination["region"]): Destination[] => {
  return destinations.filter(dest => dest.region === region)
}

export const getAllRegions = () => {
  return [
    { id: "asia-pacific", name: "Asia Pacific", count: destinations.filter(d => d.region === "asia-pacific").length },
    { id: "indian-ocean", name: "Indian Ocean", count: destinations.filter(d => d.region === "indian-ocean").length },
    { id: "africa", name: "Africa", count: destinations.filter(d => d.region === "africa").length },
    { id: "caribbean", name: "Caribbean", count: destinations.filter(d => d.region === "caribbean").length },
  ]
}
