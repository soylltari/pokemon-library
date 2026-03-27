import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IUser {
  id: string
  name: string
  email: string
  password: string
}

interface IAuthResult {
  success: boolean
  error?: { field: 'email' | 'password'; message: string }
}

interface IStore {
  users: IUser[]
  user: IUser | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<IAuthResult>
  register: (name: string, email: string, password: string) => Promise<IAuthResult>
  logout: () => void
}

export const useAuthStore = create<IStore>()(
  persist(
    (set, get) => ({
      users: [],
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        await new Promise((resolve) => setTimeout(resolve, 1500))

        const existing = get().users.find((u) => u.email === email)

        if (!existing) {
          return {
            success: false,
            error: {
              field: 'email',
              message: 'accountNotFound',
            },
          }
        }

        if (existing.password !== password) {
          return {
            success: false,
            error: { field: 'password', message: 'incorrectPassword' },
          }
        }

        const token = crypto.randomUUID()

        set({ user: existing, token, isAuthenticated: true })

        document.cookie = `auth-token=${token}; path=/; SameSite=Lax`

        return { success: true }
      },

      register: async (name, email, password) => {
        await new Promise((resolve) => setTimeout(resolve, 1500))

        const existing = get().users.find((u) => u.email === email)

        if (existing) {
          return {
            success: false,
            error: {
              field: 'email',
              message: 'accountExists',
            },
          }
        }

        const newUser: IUser = {
          id: crypto.randomUUID(),
          name,
          email,
          password,
        }

        const token = crypto.randomUUID()

        set((state) => ({
          users: [...state.users, newUser],
          user: newUser,
          token,
          isAuthenticated: true,
        }))

        document.cookie = `auth-token=${token}; path=/; SameSite=Lax`

        return { success: true }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })

        document.cookie = 'auth-token=; path=/; max-age=0'
      },
    }),
    {
      name: 'auth-storage',

      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          document.cookie = `auth-token=${state.token}; path=/; SameSite=Lax`
        }
      },
    },
  ),
)
