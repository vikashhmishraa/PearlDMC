'use client';

import { useEffect, useState, useCallback } from 'react';
import { destinations as defaultDestinations, Destination } from '@/lib/destinations-data';

const STORE_KEY = 'admin_store';

export function useDestinations() {
  const [allDestinations, setAllDestinations] = useState<Destination[]>(defaultDestinations);
  const [loading, setLoading] = useState(true);

  const loadDestinations = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORE_KEY);
      if (stored) {
        const adminStore = JSON.parse(stored);
        if (adminStore.destinations && Array.isArray(adminStore.destinations)) {
          // Merge default destinations with admin-added ones
          const merged = [
            ...defaultDestinations,
            ...adminStore.destinations.filter((d: any) => d._adminAdded)
          ];
          setAllDestinations(merged);
        } else {
          setAllDestinations(defaultDestinations);
        }
      } else {
        setAllDestinations(defaultDestinations);
      }
    } catch (error) {
      console.error('[v0] Error loading destinations:', error);
      setAllDestinations(defaultDestinations);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDestinations();

    // Listen for storage changes from other tabs or real-time updates
    const handleStorageChange = () => {
      loadDestinations();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events from the same tab
    window.addEventListener('destinationsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('destinationsUpdated', handleStorageChange);
    };
  }, [loadDestinations]);

  return { destinations: allDestinations, loading };
}
