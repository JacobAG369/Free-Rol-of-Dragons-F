import { apiFetchAuth } from '@/lib/apiClient'
import type { Personaje } from '../types/personaje.types'

export const misPersonajesApi = {
  listar: () => apiFetchAuth<Personaje>('/personajes/'),
}
