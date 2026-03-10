// Unsplash API Integration for Dynamic Photo Fetching
const UNSPLASH_API_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
const UNSPLASH_BASE_URL = 'https://api.unsplash.com';

export interface UnsplashPhoto {
  id: string;
  src: string;
  alt: string;
  title?: string;
  category?: string;
  photographer?: string;
  photographerUrl?: string;
}

/**
 * Fetch photos from Unsplash based on search query
 * @param query - Search term (e.g., "bali beach", "mountain hiking")
 * @param count - Number of photos to fetch (default: 6)
 */
export async function fetchUnsplashPhotos(
  query: string,
  count: number = 6
): Promise<UnsplashPhoto[]> {
  if (!UNSPLASH_API_KEY) {
    console.warn('[v0] NEXT_PUBLIC_UNSPLASH_ACCESS_KEY not set');
    return [];
  }

  try {
    const response = await fetch(
      `${UNSPLASH_BASE_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&client_id=${UNSPLASH_API_KEY}`
    );

    if (!response.ok) {
      console.error('[v0] Unsplash API error:', response.statusText);
      return [];
    }

    const data = await response.json();
    
    return (data.results || []).map((photo: any) => ({
      id: photo.id,
      src: photo.urls.regular,
      alt: photo.alt_description || query,
      title: photo.description || query,
      photographer: photo.user.name,
      photographerUrl: photo.user.portfolio_url || `https://unsplash.com/@${photo.user.username}`,
    }));
  } catch (error) {
    console.error('[v0] Error fetching Unsplash photos:', error);
    return [];
  }
}

/**
 * Get destination-specific photos from Unsplash
 * @param destinationName - Name of the destination (e.g., "Philippines", "Bali")
 * @param count - Number of photos to fetch
 */
export async function getDestinationPhotos(
  destinationName: string,
  count: number = 6
): Promise<UnsplashPhoto[]> {
  const queries = [
    `${destinationName} beach`,
    `${destinationName} landscape`,
    `${destinationName} travel`,
    `${destinationName} nature`,
  ];

  const searchQuery = queries[Math.floor(Math.random() * queries.length)];
  return fetchUnsplashPhotos(searchQuery, count);
}

/**
 * Get activity-specific photos from Unsplash
 * @param activity - Activity name (e.g., "diving", "hiking", "spa")
 * @param destination - Optional destination name for context
 * @param count - Number of photos to fetch
 */
export async function getActivityPhotos(
  activity: string,
  destination?: string,
  count: number = 6
): Promise<UnsplashPhoto[]> {
  const query = destination ? `${activity} ${destination}` : activity;
  return fetchUnsplashPhotos(query, count);
}

/**
 * Get photos for a specific package by combining destination and package type
 * @param packageName - Name of the package
 * @param destinationName - Name of the destination
 * @param count - Number of photos to fetch
 */
export async function getPackagePhotos(
  packageName: string,
  destinationName: string,
  count: number = 6
): Promise<UnsplashPhoto[]> {
  // Extract activity type from package name if possible
  const activityKeywords = ['adventure', 'luxury', 'honeymoon', 'beach', 'cultural', 'diving', 'hiking'];
  
  let query = `${destinationName} travel`;
  
  for (const keyword of activityKeywords) {
    if (packageName.toLowerCase().includes(keyword)) {
      query = `${keyword} ${destinationName}`;
      break;
    }
  }

  return fetchUnsplashPhotos(query, count);
}
