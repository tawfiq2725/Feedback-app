import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types/user.types";
import { UserStore } from "../types/api.types";

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      role: null,
      authToken: null,

      setAuth: (role: string, token: string) => {
        set({
          isAuthenticated: true,
          role,
          authToken: token,
        });
      },

      setUser: (user: User) => {
        set({ user });
      },

      clearUser: () => {
        set({
          user: null,
          isAuthenticated: false,
          role: null,
          authToken: null,
        });
      },
    }),
    {
      name: "user-storage",
    }
  )
);
