import { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { FilterPanel } from './FilterPanel'
import { ConjuroCard } from './ConjuroCard'
import { MonstruoCard } from './MonstruoCard'
import { ObjetoCard } from './ObjetoCard'
import { useConjuros } from '../hooks/useConjuros'
import { useMonstruos } from '../hooks/useMonstruos'
import { useObjetos } from '../hooks/useObjetos'
import type { CompendioFilters } from '../types/compendio.types'

const DEFAULT_FILTERS: CompendioFilters = {
  tipo: 'conjuros',
  busqueda: '',
  escuelas: [],
  niveles: [],
  rangosCR: [],
}

export function CompendioPage() {
  const [filters, setFilters] = useState<CompendioFilters>(DEFAULT_FILTERS)

  const conjurosState = useConjuros(filters, { enabled: filters.tipo === 'conjuros' })
  const monstruosState = useMonstruos(filters, { enabled: filters.tipo === 'monstruos' })
  const objetosState = useObjetos(filters, { enabled: filters.tipo === 'objetos' })

  const active =
    filters.tipo === 'conjuros' ? conjurosState
    : filters.tipo === 'monstruos' ? monstruosState
    : objetosState

  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && active.hasNextPage && !active.isFetchingNextPage) {
          active.fetchNextPage()
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [active])

  const loaded =
    filters.tipo === 'conjuros' ? conjurosState.conjuros.length
    : filters.tipo === 'monstruos' ? monstruosState.monstruos.length
    : objetosState.objetos.length

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-wide text-white">Compendio del SRD</h1>
        <p className="mt-2 text-white/50">
          Explora el catálogo completo de hechizos, monstruos y objetos mágicos
        </p>
      </div>

      <div className="flex items-start gap-6">
        <FilterPanel filters={filters} onChange={setFilters} />

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
              size={16}
            />
            <Input
              placeholder="Buscar por nombre…"
              value={filters.busqueda}
              onChange={(e) => setFilters((f) => ({ ...f, busqueda: e.target.value }))}
              className="border-amber-200/15 bg-amber-100/5 pl-9 text-white placeholder:text-white/30 focus-visible:ring-amber-500/50"
            />
          </div>

          {!active.isLoading && !active.isError && (
            <p className="text-sm text-white/30">
              {loaded} de {active.total} resultado{active.total !== 1 ? 's' : ''}
            </p>
          )}

          {active.isLoading && (
            <div className="flex items-center justify-center py-20 text-white/40">
              Cargando…
            </div>
          )}

          {active.isError && (
            <div className="flex items-center justify-center py-20 text-red-400">
              Error al cargar el compendio. Verifica que el backend esté corriendo.
            </div>
          )}

          {!active.isLoading && !active.isError && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filters.tipo === 'conjuros' &&
                  conjurosState.conjuros.map((c) => <ConjuroCard key={c.id} conjuro={c} />)}
                {filters.tipo === 'monstruos' &&
                  monstruosState.monstruos.map((m) => <MonstruoCard key={m.id} monstruo={m} />)}
                {filters.tipo === 'objetos' &&
                  objetosState.objetos.map((o) => <ObjetoCard key={o.id} objeto={o} />)}

                {loaded === 0 && (
                  <p className="col-span-full py-16 text-center text-white/30">
                    No se encontraron resultados con los filtros aplicados.
                  </p>
                )}
              </div>

              <div ref={sentinelRef} className="flex justify-center py-6">
                {active.isFetchingNextPage && (
                  <span className="text-sm text-white/40">Cargando más…</span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
