import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface storeState {
  accessToken: string;
  refreshToken: string;
  setAccessToken: (receivedAccessToken: string) => void;
  getAccessToken: () => string;
  setRefreshToken: (receivedRefreshToken: string) => void;
  getRefreshToken: () => string;
  setTokens: (
    receivedAccessToken: string,
    receivedRefreshToken: string,
  ) => void;
  clearTokens: () => void;
}

export const authStore = create(
  persist<storeState>(
    (set, get) => ({
      accessToken: '',
      refreshToken: '',
      setAccessToken: (receivedAccessToken: string) =>
        set({ accessToken: `Bearer ${receivedAccessToken}` }),
      getAccessToken: () => get().accessToken,
      setRefreshToken: (receivedRefreshToken: string) =>
        set({ refreshToken: `Bearer ${receivedRefreshToken}` }),
      getRefreshToken: () => get().refreshToken,
      setTokens: (
        receivedAccessToken: string,
        receivedRefreshToken: string,
      ) => {
        set({
          accessToken: `Bearer ${receivedAccessToken}`,
          refreshToken: `Bearer ${receivedRefreshToken}`,
        });
      },
      clearTokens: () => set({ accessToken: '', refreshToken: '' }),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);