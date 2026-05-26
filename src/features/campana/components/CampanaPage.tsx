import { useState } from 'react'
import { toast } from 'sonner'
import { Plus, Loader2, Map } from 'lucide-react'
import { useCampanas } from '../hooks/useCampanas'
import { CampanaCard } from './CampanaCard'
import { CampanaDetalle } from './CampanaDetalle'
import { CrearCampanaForm } from './CrearCampanaForm'
import { usePersonajes } from '@/features/mis-personajes'
import type { Campana } from '../types/campana.types'

type View = 'lista' | 'crear' | 'detalle'

export function CampanaPage() {
  const [view, setView] = useState<View>('lista')
  const [selected, setSelected] = useState<Campana | null>(null)

  const { data: campanas = [], isLoading, error } = useCampanas()
  const { data: personajes = [] } = usePersonajes()

  function aventurerosDe(campanaId: number) {
    return personajes.filter((p) => p.campana === campanaId).length
  }

  if (view === 'detalle' && selected) {
    return (
      <CampanaDetalle
        campana={selected}
        onBack={() => { setSelected(null); setView('lista') }}
      />
    )
  }

  if (view === 'crear') {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView('lista')}
            className="text-sm text-white/50 transition-colors hover:text-white"
          >
            ← Volver
          </button>
          <h1 className="text-2xl font-bold text-white">Nueva Campaña</h1>
        </div>
        <div className="mx-auto w-full max-w-xl rounded-2xl border border-amber-200/15 bg-amber-100/5 p-8">
          <CrearCampanaForm
            onSuccess={(campana) => {
              toast.success(`¡Campaña "${campana.nombre}" creada!`)
              setSelected(campana)
              setView('detalle')
            }}
            onCancel={() => setView('lista')}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Mis Campañas</h1>
          <p className="mt-1 text-white/50">Las aventuras que diriges en las tierras de Free Rol</p>
        </div>
        <button
          onClick={() => setView('crear')}
          className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-500"
        >
          <Plus size={16} />
          Nueva campaña
        </button>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-amber-400" />
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          No se pudieron cargar las campañas. Intenta de nuevo más tarde.
        </div>
      )}

      {!isLoading && !error && campanas.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-200/15 bg-amber-100/5">
            <Map size={28} className="text-white/30" />
          </div>
          <div>
            <p className="text-white/60">Aún no tienes campañas</p>
            <p className="mt-1 text-sm text-white/30">Crea tu primera aventura y reúne a tu grupo</p>
          </div>
          <button
            onClick={() => setView('crear')}
            className="mt-2 flex items-center gap-2 rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-500"
          >
            <Plus size={16} />
            Crear mi primera campaña
          </button>
        </div>
      )}

      {campanas.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {campanas.map((c) => (
            <CampanaCard
              key={c.id}
              campana={c}
              aventureros={aventurerosDe(c.id)}
              onClick={() => { setSelected(c); setView('detalle') }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
