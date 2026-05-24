import { useInfiniteQuery } from '@tanstack/react-query'
import { conjurosApi } from '../api/conjuros.api'
import type { CompendioFilters, Conjuro } from '../types/compendio.types'

type ConjurosFilters = Pick<CompendioFilters, 'busqueda' | 'escuelas' | 'niveles'>

export function useConjuros(filters: ConjurosFilters, options: { enabled: boolean }) {
  const escuela = filters.escuelas.length === 1 ? filters.escuelas[0] : undefined
  const nivel = filters.niveles.length === 1 ? String(filters.niveles[0]) : undefined

  const query = useInfiniteQuery({
    queryKey: ['conjuros', escuela, nivel],
    queryFn: ({ pageParam }) => conjurosApi.list({ page: pageParam as number, escuela, nivel }),
    initialPageParam: 1,
    getNextPageParam: (last) => {
      if (!last.next) return undefined
      return Number(new URL(last.next).searchParams.get('page'))
    },
    enabled: options.enabled,
    staleTime: Infinity,
  })

  const busqueda = filters.busqueda.toLowerCase()

  const conjuros: Conjuro[] = (query.data?.pages ?? [])
    .flatMap((p) => p.results)
    .filter((c) => !busqueda || c.nombre.toLowerCase().includes(busqueda))
    .filter((c) => !filters.escuelas.length || filters.escuelas.includes(c.escuela))
    .filter((c) => !filters.niveles.length || filters.niveles.includes(c.nivel))

  return {
    conjuros,
    total: query.data?.pages[0]?.count ?? 0,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    isError: query.isError,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
  }
}
