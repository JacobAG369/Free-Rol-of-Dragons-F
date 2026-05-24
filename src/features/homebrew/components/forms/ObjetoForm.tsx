import { useState } from 'react'
import { toast } from 'sonner'
import { Save } from 'lucide-react'
import { objetoSchema } from '../../types/homebrew.schemas'
import { CATEGORIAS_OBJETO } from '../../types/homebrew.types'
import { useCrearObjeto } from '../../hooks/useCrearObjeto'

const INIT = { nombre: '', categoria: '', es_magico: false }

interface Props {
  onSuccess: () => void
}

export function ObjetoForm({ onSuccess }: Props) {
  const [values, setValues] = useState(INIT)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { mutate, isPending, error: mutError } = useCrearObjeto()

  function handleSubmit() {
    const result = objetoSchema.safeParse(values)
    if (!result.success) {
      const errs: Record<string, string> = {}
      result.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message })
      setErrors(errs)
      return
    }
    setErrors({})
    mutate(result.data, {
      onSuccess: () => {
        toast.success(`¡Objeto "${values.nombre}" creado!`, {
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
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-white/70">Nombre del objeto</label>
        <input
          type="text"
          value={values.nombre}
          onChange={(e) => setValues((v) => ({ ...v, nombre: e.target.value }))}
          placeholder="Ej. Espada del crepúsculo"
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/25 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30"
        />
        {errors.nombre && <p className="text-xs text-red-400">{errors.nombre}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-white/70">Categoría</label>
        <select
          value={values.categoria}
          onChange={(e) => setValues((v) => ({ ...v, categoria: e.target.value }))}
          className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-purple-500/50"
        >
          <option value="">Selecciona…</option>
          {CATEGORIAS_OBJETO.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.categoria && <p className="text-xs text-red-400">{errors.categoria}</p>}
      </div>

      <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-white">Objeto mágico</p>
          <p className="text-xs text-white/40">Requiere sintonización o tiene propiedades arcanas</p>
        </div>
        <button
          type="button"
          onClick={() => setValues((v) => ({ ...v, es_magico: !v.es_magico }))}
          className={`relative h-6 w-11 rounded-full transition-colors ${values.es_magico ? 'bg-purple-600' : 'bg-white/20'}`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${values.es_magico ? 'translate-x-5' : ''}`}
          />
        </button>
      </div>

      {apiError && (
        <pre className="rounded-lg bg-red-500/10 p-3 text-xs text-red-400">{apiError}</pre>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={isPending}
        className="flex items-center justify-center gap-2 rounded-lg bg-purple-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-500 disabled:opacity-50"
      >
        <Save size={15} />
        {isPending ? 'Guardando…' : 'Guardar objeto'}
      </button>
    </div>
  )
}
