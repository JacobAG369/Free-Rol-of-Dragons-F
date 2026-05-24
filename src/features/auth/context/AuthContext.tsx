import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { authApi } from '../api/auth.api'
import type { AuthTokens, User } from '../types/auth.types'

const STORAGE_KEY = 'frod_tokens'

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  login: (tokens: AuthTokens) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])

  const login = useCallback(async (tokens: AuthTokens) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens))
    const me = await authApi.me(tokens.access)
    setUser(me)
  }, [])

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) { setIsLoading(false); return }

    const tokens: AuthTokens = JSON.parse(raw)
    authApi.me(tokens.access)
      .then(setUser)
      .catch(async () => {
        try {
          const { access } = await authApi.refresh(tokens.refresh)
          const updated = { ...tokens, access }
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
          const me = await authApi.me(access)
          setUser(me)
        } catch {
          logout()
        }
      })
      .finally(() => setIsLoading(false))
  }, [logout])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
