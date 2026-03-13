import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface IAuthResult {
  success: boolean;
  error?: { field: "email" | "password"; message: string };
}

interface IAuthState {
  users: IUser[];
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<IAuthResult>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<IAuthResult>;
  logout: () => void;
}

export const useAuthStore = create<IAuthState>()(
  persist(
    (set, get) => ({
      users: [],
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const existing = get().users.find((u) => u.email === email);

        if (!existing) {
          return {
            success: false,
            error: {
              field: "email",
              message: "accountNotFound",
            },
          };
        }

        if (existing.password !== password) {
          return {
            success: false,
            error: { field: "password", message: "incorrectPassword" },
          };
        }

        const token = crypto.randomUUID();
        set({ user: existing, token, isAuthenticated: true });
        return { success: true };
      },

      register: async (name, email, password) => {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const existing = get().users.find((u) => u.email === email);

        if (existing) {
          return {
            success: false,
            error: {
              field: "email",
              message: "accountExists",
            },
          };
        }

        const newUser: IUser = {
          id: crypto.randomUUID(),
          name,
          email,
          password,
        };
        const token = crypto.randomUUID();
        set((state) => ({
          users: [...state.users, newUser],
          user: newUser,
          token,
          isAuthenticated: true,
        }));
        return { success: true };
      },

      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: (name) => {
          if (typeof window === "undefined") return null;
          return JSON.parse(localStorage.getItem(name) ?? "null");
        },
        setItem: (name, value) =>
          localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);
