import { apiPost } from '@/lib/apiClient'
import type { ObjetoPayload } from '../types/homebrew.types'

export const objetosApi = {
  crear: (payload: ObjetoPayload) =>
    apiPost<{ id: number }>('/homebrew/objetos/', payload),
}
