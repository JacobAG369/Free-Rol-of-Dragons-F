import { apiFetch } from '@/lib/apiClient'
import type { Objeto } from '../types/compendio.types'

export const objetosApi = {
  list: (params: { page?: number }) =>
    apiFetch<Objeto>('/srd/objetos/', params),
}
