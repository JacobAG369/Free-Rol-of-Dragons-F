import { useState } from 'react'
import { toast } from 'sonner'
import { Save } from 'lucide-react'
import { hechizoSchema } from '../../types/homebrew.schemas'
import { ESCUELAS_MAGIA } from '../../types/homebrew.types'
import { useCrearHechizo } from '../../hooks/useCrearHechizo'

const INIT = { nombre: '', nivel: 0, escuela: '', concentracion: false }

interface Props {
  onSuccess: () => void
}

export function HechizoForm({ onSuccess }: Props) {
  const [values, setValues] = useState(INIT)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { mutate, isPending, error: mutError } = useCrearHechizo()

  function handleSubmit() {
    const result = hechizoSchema.safeParse(values)
    if (!result.success) {
      const errs: Record<string, string> = {}
      result.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message })
      setErrors(errs)
      return
    }
    setErrors({})
    mutate(result.data, {
      onSuccess: () => {
        toast.success(`¡Hechizo "${values.nombre}" creado!`, {
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
        <label className="text-sm font-medium text-white/70">Nombre del hechizo</label>
        <input
          type="text"
          value={values.nombre}
          onChange={(e) => setValues((v) => ({ ...v, nombre: e.target.value }))}
          placeholder="Ej. Bola de fuego de Keldris"
          className="rounded-lg border border-amber-200/15 bg-amber-100/5 px-3 py-2 text-sm text-white placeholder-white/25 outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
        />
        {errors.nombre && <p className="text-xs text-red-400">{errors.nombre}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-white/70">Nivel</label>
          <select
            value={values.nivel}
            onChange={(e) => setValues((v) => ({ ...v, nivel: Number(e.target.value) }))}
            className="rounded-lg border border-amber-200/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-amber-500/50"
          >
            <option value={0}>Truco (0)</option>
            {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>Nivel {n}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-white/70">Escuela de magia</label>
          <select
            value={values.escuela}
            onChange={(e) => setValues((v) => ({ ...v, escuela: e.target.value }))}
            className="rounded-lg border border-amber-200/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-amber-500/50"
          >
            <option value="">Selecciona…</option>
            {ESCUELAS_MAGIA.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
          {errors.escuela && <p className="text-xs text-red-400">{errors.escuela}</p>}
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-amber-200/15 bg-amber-100/5 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-white">Requiere concentración</p>
          <p className="text-xs text-white/40">El hechizo se pierde si el lanzador se distrae</p>
        </div>
        <button
          type="button"
          onClick={() => setValues((v) => ({ ...v, concentracion: !v.concentracion }))}
          className={`relative h-6 w-11 rounded-full transition-colors ${values.concentracion ? 'bg-amber-600' : 'bg-amber-100/15'}`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${values.concentracion ? 'translate-x-5' : ''}`}
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
        className="flex items-center justify-center gap-2 rounded-lg bg-amber-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-500 disabled:opacity-50"
      >
        <Save size={15} />
        {isPending ? 'Guardando…' : 'Guardar hechizo'}
      </button>
    </div>
  )
}
