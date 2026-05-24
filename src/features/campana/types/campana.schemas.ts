import { z } from 'zod'

export const campanaSchema = z.object({
  nombre: z.string().trim().min(2, 'Mínimo 2 caracteres').max(200, 'Máximo 200 caracteres'),
  notas_generales: z.string().trim().default(''),
})

export type CampanaForm = z.infer<typeof campanaSchema>
