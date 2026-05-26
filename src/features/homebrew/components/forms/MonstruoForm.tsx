import { useState } from 'react'
import { toast } from 'sonner'
import { Save, Plus, Trash2 } from 'lucide-react'
import { monstruoSchema } from '../../types/homebrew.schemas'
import type { AccionMonstruo } from '../../types/homebrew.types'
import { useCrearMonstruo } from '../../hooks/useCrearMonstruo'

const ACCION_VACIA: AccionMonstruo = { nombre: '', descripcion: '' }

interface Props {
  onSuccess: () => void
}

export function MonstruoForm({ onSuccess }: Props) {
  const [nombre, setNombre] = useState('')
  const [claseArmadura, setClaseArmadura] = useState(10)
  const [acciones, setAcciones] = useState<AccionMonstruo[]>([{ ...ACCION_VACIA }])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { mutate, isPending, error: mutError } = useCrearMonstruo()

  function updateAccion(index: number, field: keyof AccionMonstruo, value: string) {
    setAcciones((prev) => prev.map((a, i) => i === index ? { ...a, [field]: value } : a))
  }

  function addAccion() {
    setAcciones((prev) => [...prev, { ...ACCION_VACIA }])
  }

  function removeAccion(index: number) {
    setAcciones((prev) => prev.filter((_, i) => i !== index))
  }

  function handleSubmit() {
    const payload = { nombre, clase_armadura: claseArmadura, acciones }
    const result = monstruoSchema.safeParse(payload)
    if (!result.success) {
      const errs: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        const key = issue.path.length > 0 ? String(issue.path[0]) : 'acciones'
        if (!errs[key]) errs[key] = issue.message
      })
      setErrors(errs)
      return
    }
    setErrors({})
    mutate(result.data, {
      onSuccess: () => {
        toast.success(`¡Monstruo "${nombre}" creado!`, {
          description: 'Ya está disponible en tu colección homebrew.',
        })
        onSuccess()
      },
    })
  }

  const apiError = mutError
    ? (() => { try { return JSON.stringify(JSON.parse(mutError.message), null, 2) } catch { return 'Error al guardar.' } })()
    : null

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 flex flex-col gap-1.5">
          <label className="text-sm font-medium text-white/70">Nombre del monstruo</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej. Guardián de las sombras"
            className="rounded-lg border border-amber-200/15 bg-amber-100/5 px-3 py-2 text-sm text-white placeholder-white/25 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
          />
          {errors.nombre && <p className="text-xs text-red-400">{errors.nombre}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-white/70">Clase de armadura</label>
          <input
            type="number"
            min={1}
            max={30}
            value={claseArmadura}
            onChange={(e) => setClaseArmadura(Number(e.target.value))}
            className="rounded-lg border border-amber-200/15 bg-amber-100/5 px-3 py-2 text-sm text-white outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
          />
          {errors.clase_armadura && <p className="text-xs text-red-400">{errors.clase_armadura}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-white/70">Acciones</label>
          <button
            type="button"
            onClick={addAccion}
            className="flex items-center gap-1.5 rounded-lg border border-amber-200/15 px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:border-amber-500/40 hover:bg-amber-100/5 hover:text-white"
          >
            <Plus size={13} />
            Agregar acción
          </button>
        </div>

        {errors.acciones && <p className="text-xs text-red-400">{errors.acciones}</p>}

        <div className="flex flex-col gap-3">
          {acciones.map((accion, i) => (
            <div key={i} className="flex flex-col gap-2 rounded-lg border border-amber-200/15 bg-amber-100/5 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white/40">Acción {i + 1}</span>
                {acciones.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAccion(i)}
                    className="flex items-center gap-1 rounded px-1.5 py-0.5 text-xs text-red-400/60 transition-colors hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 size={11} />
                    Eliminar
                  </button>
                )}
              </div>
              <input
                type="text"
                value={accion.nombre}
                onChange={(e) => updateAccion(i, 'nombre', e.target.value)}
                placeholder="Nombre de la acción"
                className="rounded-lg border border-amber-200/15 bg-amber-100/5 px-3 py-2 text-sm text-white placeholder-white/25 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
              />
              <textarea
                value={accion.descripcion}
                onChange={(e) => updateAccion(i, 'descripcion', e.target.value)}
                placeholder="Descripción del efecto, daño, rango…"
                rows={2}
                className="resize-none rounded-lg border border-amber-200/15 bg-amber-100/5 px-3 py-2 text-sm text-white placeholder-white/25 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
              />
            </div>
          ))}
        </div>
      </div>

      {apiError && (
        <pre className="rounded-lg bg-red-500/10 p-3 text-xs text-red-400">{apiError}</pre>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={isPending}
        className="flex items-center justify-center gap-2 rounded-lg bg-amber-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-500 disabled:opacity-50"
      >
        <Save size={15} />
        {isPending ? 'Guardando…' : 'Guardar monstruo'}
      </button>
    </div>
  )
}
