import { useState } from 'react'
import { Save } from 'lucide-react'
import { campanaSchema } from '../types/campana.schemas'
import { useCrearCampana } from '../hooks/useCrearCampana'
import type { Campana } from '../types/campana.types'

interface Props {
  onSuccess: (campana: Campana) => void
  onCancel: () => void
}

export function CrearCampanaForm({ onSuccess, onCancel }: Props) {
  const [nombre, setNombre] = useState('')
  const [notas, setNotas] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { mutate, isPending } = useCrearCampana()

  function handleSubmit() {
    const result = campanaSchema.safeParse({ nombre, notas_generales: notas })
    if (!result.success) {
      const errs: Record<string, string> = {}
      result.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message })
      setErrors(errs)
      return
    }
    setErrors({})
    mutate(result.data, { onSuccess })
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-white/70">Nombre de la campaña</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej. La Maldición de Strahd"
          className="rounded-lg border border-amber-200/15 bg-amber-100/5 px-3 py-2 text-sm text-white placeholder-white/25 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
        />
        {errors.nombre && <p className="text-xs text-red-400">{errors.nombre}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-white/70">
          Notas iniciales
          <span className="ml-1 text-white/30">(opcional)</span>
        </label>
        <textarea
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
          placeholder="Contexto de la campaña, premisa, reglas de la mesa…"
          rows={4}
          className="resize-none rounded-lg border border-amber-200/15 bg-amber-100/5 px-3 py-2 text-sm text-white placeholder-white/25 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-4 py-2 text-sm font-medium text-white/50 transition-colors hover:bg-amber-100/10 hover:text-white"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
          className="flex items-center gap-2 rounded-lg bg-amber-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-500 disabled:opacity-50"
        >
          <Save size={15} />
          {isPending ? 'Creando…' : 'Crear campaña'}
        </button>
      </div>
    </div>
  )
}
