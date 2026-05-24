import { apiPost } from '@/lib/apiClient'
import type { HechizoPayload } from '../types/homebrew.types'

export const hechizosApi = {
  crear: (payload: HechizoPayload) =>
    apiPost<{ id: number }>('/homebrew/hechizos/', payload),
}
