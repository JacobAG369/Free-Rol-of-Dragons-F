import { useMutation } from '@tanstack/react-query'
import { authApi } from '../api/auth.api'
import { useAuth } from '../context/AuthContext'
import type { RegisterPayload } from '../types/auth.types'

export function useRegister() {
  const { login } = useAuth()

  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      await authApi.register(payload)
      return authApi.login({ email: payload.email, password: payload.password })
    },
    onSuccess: (tokens) => login(tokens),
  })
}
