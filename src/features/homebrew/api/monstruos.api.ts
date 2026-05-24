import { apiPost } from '@/lib/apiClient'
import type { MonstruoPayload } from '../types/homebrew.types'

export const monstruosApi = {
  crear: (payload: MonstruoPayload) =>
    apiPost<{ id: number }>('/homebrew/monstruos/', payload),
}
