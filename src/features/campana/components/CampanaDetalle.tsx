import { useState, useEffect } from 'react'
import { ArrowLeft, Save, UserPlus, UserMinus, Crown, FileText, Users } from 'lucide-react'
import { toast } from 'sonner'
import { useActualizarNotas } from '../hooks/useActualizarNotas'
import { useAsignarPersonaje, useRetirarPersonaje } from '../hooks/useAsignarPersonaje'
import { usePersonajes } from '@/features/mis-personajes'
import type { Campana } from '../types/campana.types'

interface Props {
  campana: Campana
  onBack: () => void
}

export function CampanaDetalle({ campana, onBack }: Props) {
  const [notas, setNotas] = useState(campana.notas_generales)
  const notasModificadas = notas !== campana.notas_generales

  const { mutate: guardarNotas, isPending: guardando } = useActualizarNotas()
  const { mutate: asignar, isPending: asignando } = useAsignarPersonaje()
  const { mutate: retirar, isPending: retirando } = useRetirarPersonaje()
  const { data: personajes = [] } = usePersonajes()

  useEffect(() => { setNotas(campana.notas_generales) }, [campana.id])

  const grupo = personajes.filter((p) => p.campana === campana.id)
  const disponibles = personajes.filter((p) => p.campana === null || p.campana === undefined)

  function handleGuardarNotas() {
    guardarNotas(
      { id: campana.id, notas },
      { onSuccess: () => toast.success('Notas guardadas') },
    )
  }

  function handleAsignar(personajeId: number, nombre: string) {
    asignar(
      { personajeId, campanaId: campana.id },
      { onSuccess: () => toast.success(`${nombre} se unió a la campaña`) },
    )
  }

  function handleRetirar(personajeId: number, nombre: string) {
    retirar(
      personajeId,
      { onSuccess: () => toast.success(`${nombre} abandonó la campaña`) },
    )
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Cabecera */}
      <div className="flex flex-col gap-3">
        <button
          onClick={onBack}
          className="flex w-fit items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          Volver a mis campañas
        </button>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-white">{campana.nombre}</h1>
          <span className="flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-sm font-medium text-amber-300">
            <Crown size={13} />
            {campana.director}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Notas de campaña */}
        <div className="flex flex-col gap-3 rounded-2xl border border-amber-200/15 bg-amber-100/5 p-6">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-amber-400" />
            <h2 className="font-semibold text-white">Notas de campaña</h2>
          </div>
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Escribe el lore, los eventos importantes, NPCs clave, pistas…"
            rows={10}
            className="resize-none rounded-lg border border-amber-200/15 bg-black/30 px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
          />
          {notasModificadas && (
            <button
              type="button"
              onClick={handleGuardarNotas}
              disabled={guardando}
              className="flex items-center justify-center gap-2 rounded-lg bg-amber-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-500 disabled:opacity-50"
            >
              <Save size={14} />
              {guardando ? 'Guardando…' : 'Guardar notas'}
            </button>
          )}
        </div>

        {/* Grupo de aventureros */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 rounded-2xl border border-amber-200/15 bg-amber-100/5 p-6">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-green-400" />
              <h2 className="font-semibold text-white">
                Grupo de aventureros
                <span className="ml-2 text-sm font-normal text-white/40">({grupo.length})</span>
              </h2>
            </div>

            {grupo.length === 0 ? (
              <p className="py-4 text-center text-sm text-white/30">
                Ningún personaje en esta campaña aún
              </p>
            ) : (
              <ul className="flex flex-col gap-2">
                {grupo.map((p) => {
                  const claseNombre = p.clases[0]?.clase_nombre ?? '—'
                  return (
                    <li key={p.id} className="flex items-center justify-between rounded-lg border border-amber-200/15 bg-black/20 px-3 py-2">
                      <div>
                        <p className="text-sm font-medium text-white">{p.nombre}</p>
                        <p className="text-xs text-white/40">{p.raza_nombre} · {claseNombre}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRetirar(p.id, p.nombre)}
                        disabled={retirando}
                        className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-red-400/60 transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                      >
                        <UserMinus size={13} />
                        Retirar
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {disponibles.length > 0 && (
            <div className="flex flex-col gap-3 rounded-2xl border border-amber-200/15 bg-amber-100/5 p-6">
              <h3 className="text-sm font-semibold text-white/60">Disponibles para unirse</h3>
              <ul className="flex flex-col gap-2">
                {disponibles.map((p) => {
                  const claseNombre = p.clases[0]?.clase_nombre ?? '—'
                  return (
                    <li key={p.id} className="flex items-center justify-between rounded-lg border border-amber-200/15 bg-black/20 px-3 py-2">
                      <div>
                        <p className="text-sm font-medium text-white/80">{p.nombre}</p>
                        <p className="text-xs text-white/40">{p.raza_nombre} · {claseNombre}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAsignar(p.id, p.nombre)}
                        disabled={asignando}
                        className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-green-400/60 transition-colors hover:bg-green-500/10 hover:text-green-400 disabled:opacity-50"
                      >
                        <UserPlus size={13} />
                        Añadir
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
