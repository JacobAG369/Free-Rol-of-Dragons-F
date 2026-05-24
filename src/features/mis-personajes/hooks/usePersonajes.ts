import { useQuery } from '@tanstack/react-query'
import { misPersonajesApi } from '../api/personajes.api'

export function usePersonajes() {
  return useQuery({
    queryKey: ['personajes'],
    queryFn: misPersonajesApi.listar,
    select: (data) => data.results,
  })
}
