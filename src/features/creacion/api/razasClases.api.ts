import { apiFetch } from '@/lib/apiClient'
import type { Clase, Raza } from '../types/creacion.types'

export const razasClasesApi = {
  razas: () => apiFetch<Raza>('/srd/razas/'),
  clases: () => apiFetch<Clase>('/srd/clases/'),
}
