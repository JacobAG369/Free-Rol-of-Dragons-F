import { apiFetchAuth, apiPost, apiPatch } from '@/lib/apiClient'
import type { Campana, CampanaPayload } from '../types/campana.types'

export const campanasApi = {
  listar: () => apiFetchAuth<Campana>('/campanas/'),

  crear: (payload: CampanaPayload) =>
    apiPost<Campana>('/campanas/', payload),

  actualizarNotas: (id: number, notas_generales: string) =>
    apiPatch<Campana>(`/campanas/${id}/`, { notas_generales }),
}
