import { useInfiniteQuery } from '@tanstack/react-query'
import { objetosApi } from '../api/objetos.api'
import type { CompendioFilters, Objeto } from '../types/compendio.types'

type ObjetosFilters = Pick<CompendioFilters, 'busqueda'>

export function useObjetos(filters: ObjetosFilters, options: { enabled: boolean }) {
  const query = useInfiniteQuery({
    queryKey: ['objetos'],
    queryFn: ({ pageParam }) => objetosApi.list({ page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (last) => {
      if (!last.next) return undefined
      return Number(new URL(last.next).searchParams.get('page'))
    },
    enabled: options.enabled,
    staleTime: Infinity,
  })

  const busqueda = filters.busqueda.toLowerCase()

  const objetos: Objeto[] = (query.data?.pages ?? [])
    .flatMap((p) => p.results)
    .filter((o) => !busqueda || o.nombre.toLowerCase().includes(busqueda))

  return {
    objetos,
    total: query.data?.pages[0]?.count ?? 0,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    isError: query.isError,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
  }
}
