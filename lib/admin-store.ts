// Admin Data Store - In-Memory with LocalStorage Persistence
import { Destination, TourPackage } from './destinations-data';

const STORE_KEY = 'admin_store';

export interface AdminStoreData {
  destinations: Array<Destination & { _adminAdded?: boolean }>;
  inquiries: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    packageId: string;
    destinationName: string;
    createdAt: number;
    status: 'new' | 'contacted' | 'closed';
  }>;
}

// Initial store - will load from localStorage or use defaults
let store: AdminStoreData = {
  destinations: [],
  inquiries: []
};

// Initialize store from localStorage
export const initializeStore = (initialDestinations: Destination[]) => {
  if (typeof window === 'undefined') return;
  
  try {
    const stored = localStorage.getItem(STORE_KEY);
    if (stored) {
      store = JSON.parse(stored);
    } else {
      // First time - use initial destinations
      store.destinations = initialDestinations;
      saveStore();
    }
  } catch (error) {
    console.error('Failed to initialize store:', error);
    store.destinations = initialDestinations;
  }
};

// Save store to localStorage
const saveStore = () => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
    // Emit custom event for real-time updates
    window.dispatchEvent(new Event('destinationsUpdated'));
  } catch (error) {
    console.error('Failed to save store:', error);
  }
};

// Get all data
export const getStore = (): AdminStoreData => store;

// Destinations Management
export const adminStore = {
  // Get all destinations
  getDestinations: (): Array<Destination & { _adminAdded?: boolean }> => {
    return store.destinations;
  },

  // Get single destination
  getDestination: (id: string) => {
    return store.destinations.find(d => d.id === id);
  },

  // Add destination
  addDestination: (destination: Destination) => {
    store.destinations.push({ ...destination, _adminAdded: true });
    saveStore();
    return destination;
  },

  // Update destination
  updateDestination: (id: string, updates: Partial<Destination>) => {
    const index = store.destinations.findIndex(d => d.id === id);
    if (index !== -1) {
      store.destinations[index] = { ...store.destinations[index], ...updates };
      saveStore();
      return store.destinations[index];
    }
    return null;
  },

  // Delete destination
  deleteDestination: (id: string) => {
    store.destinations = store.destinations.filter(d => d.id !== id);
    // Also remove associated inquiries
    store.inquiries = store.inquiries.filter(i => {
      const dest = store.destinations.find(d => d.id === i.destinationName);
      return dest !== undefined;
    });
    saveStore();
  },

  // Packages Management
  addPackage: (destinationId: string, pkg: TourPackage) => {
    const destination = store.destinations.find(d => d.id === destinationId);
    if (destination) {
      destination.packages.push(pkg);
      saveStore();
      return pkg;
    }
    return null;
  },

  updatePackage: (destinationId: string, packageId: string, updates: Partial<TourPackage>) => {
    const destination = store.destinations.find(d => d.id === destinationId);
    if (destination) {
      const pkgIndex = destination.packages.findIndex(p => p.id === packageId);
      if (pkgIndex !== -1) {
        destination.packages[pkgIndex] = { ...destination.packages[pkgIndex], ...updates };
        saveStore();
        return destination.packages[pkgIndex];
      }
    }
    return null;
  },

  deletePackage: (destinationId: string, packageId: string) => {
    const destination = store.destinations.find(d => d.id === destinationId);
    if (destination) {
      destination.packages = destination.packages.filter(p => p.id !== packageId);
      saveStore();
    }
  },

  // Inquiries Management
  addInquiry: (inquiry: Omit<AdminStoreData['inquiries'][0], 'id' | 'createdAt'>) => {
    const newInquiry = {
      ...inquiry,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: Date.now()
    };
    store.inquiries.push(newInquiry);
    saveStore();
    return newInquiry;
  },

  getInquiries: () => {
    return store.inquiries.sort((a, b) => b.createdAt - a.createdAt);
  },

  updateInquiry: (id: string, updates: Partial<AdminStoreData['inquiries'][0]>) => {
    const index = store.inquiries.findIndex(i => i.id === id);
    if (index !== -1) {
      store.inquiries[index] = { ...store.inquiries[index], ...updates };
      saveStore();
      return store.inquiries[index];
    }
    return null;
  },

  deleteInquiry: (id: string) => {
    store.inquiries = store.inquiries.filter(i => i.id !== id);
    saveStore();
  },

  // Statistics
  getStats: () => {
    return {
      totalDestinations: store.destinations.length,
      totalPackages: store.destinations.reduce((sum, d) => sum + d.packages.length, 0),
      totalInquiries: store.inquiries.length,
      newInquiries: store.inquiries.filter(i => i.status === 'new').length,
      contactedInquiries: store.inquiries.filter(i => i.status === 'contacted').length,
      closedInquiries: store.inquiries.filter(i => i.status === 'closed').length
    };
  }
};
