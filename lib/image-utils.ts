// Unsplash API integration for fetching travel destination images
// Free API: https://unsplash.com/api

export interface UnsplashImage {
  id: string
  url: string
  fullUrl: string
  thumb: string
  description: string | null
  photographer: string
  photographerUrl: string
}

// Fetch images from Unsplash for a given query
export async function fetchUnsplashImages(
  query: string,
  perPage: number = 12
): Promise<UnsplashImage[]> {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&per_page=${perPage}&orientation=landscape`,
      {
        headers: {
          'Authorization': `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || 'demo'}`,
        },
      }
    )

    if (!response.ok) {
      console.error('[v0] Unsplash API error:', response.status)
      return []
    }

    const data = await response.json()

    return data.results.map((photo: any) => ({
      id: photo.id,
      url: photo.urls.regular,
      fullUrl: photo.urls.full,
      thumb: photo.urls.thumb,
      description: photo.description || photo.alt_description,
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html,
    }))
  } catch (error) {
    console.error('[v0] Failed to fetch Unsplash images:', error)
    return []
  }
}

// Get related destination images
export async function getDestinationImages(destinationName: string) {
  return fetchUnsplashImages(`${destinationName} travel tourism`, 8)
}

// Get activity-specific images
export async function getActivityImages(activity: string) {
  return fetchUnsplashImages(`${activity} travel adventure`, 6)
}
