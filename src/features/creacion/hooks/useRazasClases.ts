import { useQuery } from '@tanstack/react-query'
import { razasClasesApi } from '../api/razasClases.api'

export function useRazas() {
  return useQuery({
    queryKey: ['srd-razas'],
    queryFn: () => razasClasesApi.razas(),
    staleTime: Infinity,
    select: (data) => data.results,
  })
}

export function useClases() {
  return useQuery({
    queryKey: ['srd-clases'],
    queryFn: () => razasClasesApi.clases(),
    staleTime: Infinity,
    select: (data) => data.results,
  })
}
