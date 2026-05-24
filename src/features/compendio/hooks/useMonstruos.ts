import { useInfiniteQuery } from '@tanstack/react-query'
import { monstruosApi } from '../api/monstruos.api'
import type { CompendioFilters, Monstruo } from '../types/compendio.types'

type MonstruosFilters = Pick<CompendioFilters, 'busqueda' | 'rangosCR'>

function parseCR(desafio: string): number {
  if (desafio === '1/8') return 0.125
  if (desafio === '1/4') return 0.25
  if (desafio === '1/2') return 0.5
  return parseFloat(desafio) || 0
}

const CR_RANGES: Record<string, (cr: number) => boolean> = {
  'CR 0-5': (cr) => cr <= 5,
  'CR 6-10': (cr) => cr >= 6 && cr <= 10,
  'CR 11-15': (cr) => cr >= 11 && cr <= 15,
  'CR +16': (cr) => cr >= 16,
}

export function useMonstruos(filters: MonstruosFilters, options: { enabled: boolean }) {
  const query = useInfiniteQuery({
    queryKey: ['monstruos'],
    queryFn: ({ pageParam }) => monstruosApi.list({ page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (last) => {
      if (!last.next) return undefined
      return Number(new URL(last.next).searchParams.get('page'))
    },
    enabled: options.enabled,
    staleTime: Infinity,
  })

  const busqueda = filters.busqueda.toLowerCase()

  const monstruos: Monstruo[] = (query.data?.pages ?? [])
    .flatMap((p) => p.results)
    .filter((m) => !busqueda || m.nombre.toLowerCase().includes(busqueda))
    .filter((m) => {
      if (!filters.rangosCR.length) return true
      const cr = parseCR(m.desafio)
      return filters.rangosCR.some((r) => CR_RANGES[r]?.(cr))
    })

  return {
    monstruos,
    total: query.data?.pages[0]?.count ?? 0,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    isError: query.isError,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
  }
}
