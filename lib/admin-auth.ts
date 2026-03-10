// Admin Authentication System
// Simple hardcoded credentials for initial implementation

export const ADMIN_CREDENTIALS = {
  email: 'admin@peardmc.com',
  password: 'admin123'
};

export interface AdminSession {
  email: string;
  sessionId: string;
  createdAt: number;
  expiresAt: number;
}

const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const SESSION_KEY = 'admin_session';

export const adminAuth = {
  // Login and create session
  login: (email: string, password: string): AdminSession | null => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const sessionId = Math.random().toString(36).substring(2, 15);
      const session: AdminSession = {
        email,
        sessionId,
        createdAt: Date.now(),
        expiresAt: Date.now() + SESSION_DURATION
      };
      
      if (typeof window !== 'undefined') {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      }
      
      return session;
    }
    return null;
  },

  // Verify session is valid
  verifySession: (): AdminSession | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      const sessionStr = localStorage.getItem(SESSION_KEY);
      if (!sessionStr) return null;
      
      const session = JSON.parse(sessionStr) as AdminSession;
      
      // Check if session hasn't expired
      if (Date.now() > session.expiresAt) {
        localStorage.removeItem(SESSION_KEY);
        return null;
      }
      
      return session;
    } catch (error) {
      return null;
    }
  },

  // Logout and remove session
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SESSION_KEY);
    }
  },

  // Get current session
  getSession: (): AdminSession | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      const sessionStr = localStorage.getItem(SESSION_KEY);
      return sessionStr ? JSON.parse(sessionStr) as AdminSession : null;
    } catch (error) {
      return null;
    }
  },

  // Check if admin is logged in
  isAuthenticated: (): boolean => {
    return adminAuth.verifySession() !== null;
  }
};
