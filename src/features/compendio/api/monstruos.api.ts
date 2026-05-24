import { apiFetch } from '@/lib/apiClient'
import type { Monstruo } from '../types/compendio.types'

export const monstruosApi = {
  list: (params: { page?: number }) =>
    apiFetch<Monstruo>('/srd/monstruos/', params),
}
