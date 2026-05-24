import { apiPatch } from '@/lib/apiClient'
import type { Personaje } from '@/features/mis-personajes'

export const asignacionApi = {
  asignarACampana: (personajeId: number, campanaId: number) =>
    apiPatch<Personaje>(`/personajes/${personajeId}/`, { campana: campanaId }),

  retirarDeCampana: (personajeId: number) =>
    apiPatch<Personaje>(`/personajes/${personajeId}/`, { campana: null }),
}
