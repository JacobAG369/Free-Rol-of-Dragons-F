import { apiFetch } from '@/lib/apiClient'
import type { Conjuro } from '../types/compendio.types'

export const conjurosApi = {
  list: (params: { page?: number; nivel?: string; escuela?: string }) =>
    apiFetch<Conjuro>('/srd/conjuros/', params),
}
