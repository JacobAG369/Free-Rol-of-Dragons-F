import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight, Save } from 'lucide-react'
import { toast } from 'sonner'
import { StepIndicator } from './StepIndicator'
import { Step1InfoBasica, validateStep1 } from './steps/Step1InfoBasica'
import { Step2Atributos, validateStep2 } from './steps/Step2Atributos'
import { Step3Trasfondo, validateStep3 } from './steps/Step3Trasfondo'
import { Step4Resumen } from './steps/Step4Resumen'
import { useRazas, useClases } from '../hooks/useRazasClases'
import { useCrearPersonaje } from '../hooks/useCrearPersonaje'
import type { Step1Values, Step2Values, Step3Values } from '../types/creacion.schemas'

const STEP1_INIT: Step1Values = { nombre: '', raza_id: 0, clase_id: 0 }
const STEP2_INIT: Step2Values = { fuerza: 10, destreza: 10, constitucion: 10, inteligencia: 10, sabiduria: 10, carisma: 10 }
const STEP3_INIT: Partial<Step3Values> = {}

export function CrearPersonajeWizard() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [s1, setS1] = useState<Step1Values>(STEP1_INIT)
  const [s2, setS2] = useState<Step2Values>(STEP2_INIT)
  const [s3, setS3] = useState<Partial<Step3Values>>(STEP3_INIT)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { data: razas = [] } = useRazas()
  const { data: clases = [] } = useClases()
  const { mutate: crear, isPending, error: mutError } = useCrearPersonaje()

  const raza = razas.find((r) => r.id === s1.raza_id)
  const clase = clases.find((c) => c.id === s1.clase_id)

  function next() {
    let errs: Record<string, string> = {}
    if (step === 0) errs = validateStep1(s1)
    if (step === 1) errs = validateStep2(s2)
    if (step === 2) errs = validateStep3(s3)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStep((s) => s + 1)
  }

  function save() {
    if (!clase) return
    crear(
      { step1: s1, step2: s2, step3: s3 as Step3Values, clase },
      {
        onSuccess: () => {
          toast.success(`¡${s1.nombre} ha sido creado!`, {
            description: 'Tu héroe está listo para la aventura.',
          })
          navigate({ to: '/mis-personajes' })
        },
      },
    )
  }

  const apiError = mutError
    ? (() => {
        try { return JSON.stringify(JSON.parse(mutError.message), null, 2) }
        catch { return 'Error al guardar el personaje.' }
      })()
    : null

  return (
    <div className="flex flex-col gap-6">
      <StepIndicator current={step} />

      <div className="min-h-72">
        {step === 0 && <Step1InfoBasica values={s1} onChange={setS1} errors={errors} />}
        {step === 1 && <Step2Atributos values={s2} onChange={setS2} errors={errors} />}
        {step === 2 && <Step3Trasfondo values={s3} onChange={setS3} errors={errors} />}
        {step === 3 && <Step4Resumen step1={s1} step2={s2} step3={s3} raza={raza} clase={clase} />}
      </div>

      {apiError && (
        <pre className="rounded-lg bg-red-500/10 p-3 text-xs text-red-400">{apiError}</pre>
      )}

      <div className="flex justify-between pt-2">
        <button
          type="button"
          onClick={() => { setErrors({}); setStep((s) => s - 1) }}
          disabled={step === 0}
          className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white/50 transition-colors hover:bg-white/10 hover:text-white disabled:invisible"
        >
          <ChevronLeft size={16} />
          Anterior
        </button>

        {step < 3 ? (
          <button
            type="button"
            onClick={next}
            className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
          >
            Siguiente
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={save}
            disabled={isPending}
            className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-500 disabled:opacity-50"
          >
            <Save size={16} />
            {isPending ? 'Guardando…' : 'Guardar personaje'}
          </button>
        )}
      </div>
    </div>
  )
}
