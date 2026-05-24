import { useQuery } from '@tanstack/react-query'
import { campanasApi } from '../api/campanas.api'

export function useCampanas() {
  return useQuery({
    queryKey: ['campanas'],
    queryFn: campanasApi.listar,
    select: (data) => data.results,
  })
}
