import { apiPost } from '@/lib/apiClient'
import type { PersonajeClasePayload, PersonajePayload } from '../types/creacion.types'

interface PersonajeCreado {
  id: number
}

export const personajesApi = {
  crear: (payload: PersonajePayload) =>
    apiPost<PersonajeCreado>('/personajes/', payload),

  asignarClase: (payload: PersonajeClasePayload) =>
    apiPost('/personajes-clases/', payload),
}
