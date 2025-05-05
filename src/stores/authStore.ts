import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  users: User[];
  initializeAuth: () => void;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

// Mock admin and user accounts
const MOCK_ADMIN: User = {
  id: '1',
  email: 'admin@ouibooking.com',
  name: 'Admin User',
  role: 'admin',
  createdAt: new Date().toISOString(),
};

const MOCK_USERS: User[] = Array.from({ length: 5 }, (_, i) => ({
  id: `${i + 2}`,
  email: `user${i + 1}@ouibooking.com`,
  name: `User ${i + 1}`,
  role: 'user',
  createdAt: new Date().toISOString(),
}));

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      users: [MOCK_ADMIN, ...MOCK_USERS],
      
      initializeAuth: () => {
        // This would normally check with a backend
        // For demo purposes, we're just using the persisted state
      },
      
      login: async (email, password) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const { users } = get();
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (user && password === 'password') { // Simple password for demo
          set({ isAuthenticated: true, user });
          return { success: true };
        }
        
        return { 
          success: false, 
          message: 'Invalid email or password' 
        };
      },
      
      signup: async (name, email, password) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const { users } = get();
        
        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
          return { 
            success: false, 
            message: 'Email is already in use' 
          };
        }
        
        const newUser: User = {
          id: `${users.length + 1}`,
          email,
          name,
          role: 'user', // New users are always regular users
          createdAt: new Date().toISOString(),
        };
        
        set(state => ({ 
          users: [...state.users, newUser],
          isAuthenticated: true,
          user: newUser
        }));
        
        return { success: true };
      },
      
      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
      
      addUser: (userData) => {
        const { users } = get();
        const newUser: User = {
          ...userData,
          id: `${users.length + 1}`,
          createdAt: new Date().toISOString(),
        };
        
        set(state => ({ 
          users: [...state.users, newUser] 
        }));
      },
      
      updateUser: (id, updates) => {
        set(state => ({
          users: state.users.map(user => 
            user.id === id ? { ...user, ...updates } : user
          ),
          user: state.user?.id === id ? { ...state.user, ...updates } : state.user
        }));
      },
      
      deleteUser: (id) => {
        set(state => ({
          users: state.users.filter(user => user.id !== id)
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);