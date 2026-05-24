import { API_BASE } from '@/lib/apiClient'
import type { AuthTokens, LoginPayload, RegisterPayload, User } from '../types/auth.types'

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(JSON.stringify(error))
  }
  return res.json()
}

async function getMe(accessToken: string): Promise<User> {
  const res = await fetch(`${API_BASE}/auth/me/`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) throw new Error('Unauthorized')
  return res.json()
}

export const authApi = {
  login: (payload: LoginPayload) => post<AuthTokens>('/auth/token/', payload),
  register: (payload: RegisterPayload) => post<User>('/auth/register/', payload),
  refresh: (refresh: string) =>
    post<{ access: string }>('/auth/token/refresh/', { refresh }),
  me: getMe,
}
