import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Sample destinations and packages data
const seedData = {
  destinations: [
    {
      id: 'philippines',
      name: 'Philippines',
      country: 'Philippines',
      region: 'asia-pacific',
      tagline: '7,641 Islands of Paradise',
      description: 'Discover a tropical archipelago where pristine beaches meet vibrant culture.',
      hero_image: '/images/philippines-hero.jpg',
      best_time_to_visit: 'November - May',
      currency: 'PHP',
      language: 'Filipino, English',
      timezone: 'GMT+8',
      highlights: ['Palawan', 'Boracay', 'Cebu', 'Bohol'],
      is_active: true
    }
  ],
  packages: [
    {
      name: 'Classic Philippines',
      destination_id: 'philippines',
      description: 'Experience the best of Philippine islands',
      duration_days: 7,
      price_min: 1200,
      price_max: 1800,
      currency: 'USD',
      package_type: 'beach',
      inclusions: ['Accommodation', 'Meals', 'Tours'],
      exclusions: ['Flights', 'Visas'],
      min_group_size: 2,
      max_group_size: 20,
      is_active: true
    }
  ]
}

export async function POST(request: NextRequest) {
  try {
    // Seed destinations
    for (const destination of seedData.destinations) {
      const { error } = await supabase
        .from('destinations')
        .upsert([destination], { onConflict: 'id' })

      if (error) throw error
    }

    // Seed packages
    for (const pkg of seedData.packages) {
      const { error } = await supabase
        .from('packages')
        .upsert([pkg], { onConflict: 'id' })

      if (error) throw error
    }

    return NextResponse.json({ success: true, message: 'Data seeded successfully' })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: 'Failed to seed data' }, { status: 500 })
  }
}
