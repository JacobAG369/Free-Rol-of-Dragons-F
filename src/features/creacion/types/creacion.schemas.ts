import { z } from 'zod'
import { ALINEAMIENTOS, TRASFONDOS } from './creacion.types'

const stat = z
  .number({ invalid_type_error: 'Ingresa un número' })
  .int('Debe ser un número entero')
  .min(3, 'Mínimo 3')
  .max(20, 'Máximo 20')

export const step1Schema = z.object({
  nombre: z.string().trim().min(2, 'Mínimo 2 caracteres').max(100, 'Máximo 100 caracteres'),
  raza_id: z.number({ invalid_type_error: 'Selecciona una raza' }).positive('Selecciona una raza'),
  clase_id: z.number({ invalid_type_error: 'Selecciona una clase' }).positive('Selecciona una clase'),
})

export const step2Schema = z.object({
  fuerza: stat,
  destreza: stat,
  constitucion: stat,
  inteligencia: stat,
  sabiduria: stat,
  carisma: stat,
})

export const step3Schema = z.object({
  trasfondo: z.enum(TRASFONDOS, { error: 'Selecciona un trasfondo' }),
  alineamiento: z.enum(ALINEAMIENTOS, { error: 'Selecciona un alineamiento' }),
})

export type Step1Values = z.infer<typeof step1Schema>
export type Step2Values = z.infer<typeof step2Schema>
export type Step3Values = z.infer<typeof step3Schema>
