import create from 'zustand'
import shallow from 'zustand/shallow'

type AuthResponse = {
  title: string | null
  forename: string
  surname: string
  userId: number
}

type AuthStatus = 'idle' | 'loading' | 'authorised' | 'error'

// Mock Authentication ------------------------------------------------
const authentication = (): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() < 0.3
        ? reject('Authentication failed.')
        : resolve({
            title: 'Mr',
            forename: 'Josh',
            surname: 'Mane',
            userId: 6730
          })
    }, 1200)
  })
}

// Auth Store ------------------------------------------------
interface AuthStore {
  status: AuthStatus
  data: AuthResponse
  dice: number
  error?: unknown
  authenticate(): Promise<void>
  signout(): Promise<void>
  setDice(t: number): void
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  status: 'idle',
  data: {} as AuthResponse,
  dice: 6,

  authenticate: async () => {
    try {
      set((state) => ({ ...state, status: 'loading' }))
      const data = await authentication()
      set({ status: 'authorised', data })
    } catch (error) {
      set((state) => ({ ...state, status: 'error', error }))
      get().signout()
    }
  },

  signout: () =>
    new Promise((resolve) => {
      console.log('signed out')
      resolve()
    }),

  setDice(t: number) {
    set((state) => ({
      ...state,
      dice: t
    }))
  }
}))

// Selector Hooks ------------------------------------------------

export const selectAuthError = () => useAuthStore(({ error }) => error)
export const selectAuthData = () => useAuthStore(({ data }) => data)
export const selectAuthStatus = () => useAuthStore(({ status }) => status)
export const actionAuthenticate = () =>
  useAuthStore(({ authenticate }) => authenticate)
export const selectDice = () =>
  useAuthStore(({ dice, setDice }) => ({ dice, setDice }), shallow)
