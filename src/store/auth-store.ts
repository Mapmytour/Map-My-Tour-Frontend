import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, AuthResponse } from '@/types/auth';

interface AuthState {
  // State
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setAuth: (authData: AuthResponse) => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearAuth: () => void;
  updateTokens: (accessToken: string, refreshToken: string) => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      setAuth: (authData: AuthResponse) => {
        set({
          user: authData.user,
          accessToken: authData.accessToken,
          refreshToken: authData.refreshToken,
          isAuthenticated: !!(authData.accessToken && authData.user), // Compute based on actual data
          error: null,
          isLoading: false,
        });
      },

      setUser: (user: User) => {
        const currentState = get();
        set({
          user,
          isAuthenticated: !!(currentState.accessToken && user) // Update isAuthenticated when user is set
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error, isLoading: false });
      },

      clearAuth: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null,
          isLoading: false,
        });
      },

      updateTokens: (accessToken: string, refreshToken: string) => {
        const currentState = get();
        set({
          accessToken,
          refreshToken,
          isAuthenticated: !!(accessToken && currentState.user) // Update isAuthenticated when tokens change
        });
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        const currentState = get();
        if (currentUser) {
          const updatedUser = { ...currentUser, ...userData };
          set({
            user: updatedUser,
            isAuthenticated: !!(currentState.accessToken && updatedUser)
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => ({
        getItem: (name: string) => {
          // Use sessionStorage since localStorage is not available in artifacts
          if (typeof window !== 'undefined') {
            return window.sessionStorage.getItem(name);
          }
          return null;
        },
        setItem: (name: string, value: string) => {
          if (typeof window !== 'undefined') {
            window.sessionStorage.setItem(name, value);
          }
        },
        removeItem: (name: string) => {
          if (typeof window !== 'undefined') {
            window.sessionStorage.removeItem(name);
          }
        },
      })),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
      // Rehydrate isAuthenticated based on actual data
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isAuthenticated = !!(state.accessToken && state.user);
        }
      },
    }
  )
);