import { useMutation } from '@tanstack/react-query'
import { authApi } from '../api/auth.api'
import { useAuth } from '../context/AuthContext'
import type { LoginPayload } from '../types/auth.types'

export function useLogin() {
  const { login } = useAuth()

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (tokens) => login(tokens),
  })
}
