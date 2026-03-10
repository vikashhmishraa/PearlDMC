'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { adminAuth, AdminSession } from '@/lib/admin-auth';
import { initializeStore } from '@/lib/admin-store';
import { destinations } from '@/lib/destinations-data';

interface AdminContextType {
  session: AdminSession | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize on mount
  useEffect(() => {
    const existingSession = adminAuth.verifySession();
    setSession(existingSession);
    initializeStore(destinations);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const newSession = adminAuth.login(email, password);
    if (newSession) {
      setSession(newSession);
      initializeStore(destinations);
      return true;
    }
    return false;
  };

  const logout = () => {
    adminAuth.logout();
    setSession(null);
  };

  return (
    <AdminContext.Provider
      value={{
        session,
        isLoading,
        login,
        logout,
        isAuthenticated: session !== null
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin(): AdminContextType {
  const context = useContext(AdminContext);
  if (context === undefined) {
    // Provide default values during build/SSR
    return {
      session: null,
      isLoading: false,
      login: async () => false,
      logout: () => {},
      isAuthenticated: false
    };
  }
  return context;
}
