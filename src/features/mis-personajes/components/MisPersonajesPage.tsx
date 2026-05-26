import { Link } from '@tanstack/react-router'
import { UserPlus, Loader2, Users } from 'lucide-react'
import { usePersonajes } from '../hooks/usePersonajes'
import { PersonajeCard } from './PersonajeCard'

export function MisPersonajesPage() {
  const { data: personajes, isLoading, error } = usePersonajes()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Mis Personajes</h1>
          <p className="mt-1 text-white/50">Todos tus héroes de las tierras de Free Rol</p>
        </div>
        <Link
          to="/creacion"
          className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-amber-500"
        >
          <UserPlus size={16} />
          Crear personaje
        </Link>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-amber-400" />
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          No se pudieron cargar los personajes. Intenta de nuevo más tarde.
        </div>
      )}

      {!isLoading && !error && personajes?.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-200/15 bg-amber-100/5">
            <Users size={28} className="text-white/30" />
          </div>
          <div>
            <p className="text-white/60">Aún no tienes personajes</p>
            <p className="mt-1 text-sm text-white/30">Empieza creando tu primer héroe</p>
          </div>
          <Link
            to="/creacion"
            className="mt-2 flex items-center gap-2 rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-amber-500"
          >
            <UserPlus size={16} />
            Crear mi primer personaje
          </Link>
        </div>
      )}

      {personajes && personajes.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {personajes.map((p) => (
            <PersonajeCard key={p.id} personaje={p} />
          ))}
        </div>
      )}
    </div>
  )
}
