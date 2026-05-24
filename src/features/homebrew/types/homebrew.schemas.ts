import { z } from 'zod'

export const hechizoSchema = z.object({
  nombre: z.string().trim().min(2, 'Mínimo 2 caracteres').max(200, 'Máximo 200 caracteres'),
  nivel: z.number().int().min(0).max(9),
  escuela: z.string().min(1, 'Selecciona una escuela'),
  concentracion: z.boolean(),
})

export const objetoSchema = z.object({
  nombre: z.string().trim().min(2, 'Mínimo 2 caracteres').max(200, 'Máximo 200 caracteres'),
  categoria: z.string().min(1, 'Selecciona una categoría'),
  es_magico: z.boolean(),
})

export const accionSchema = z.object({
  nombre: z.string().trim().min(1, 'Nombre requerido'),
  descripcion: z.string().trim().min(1, 'Descripción requerida'),
})

export const monstruoSchema = z.object({
  nombre: z.string().trim().min(2, 'Mínimo 2 caracteres').max(200, 'Máximo 200 caracteres'),
  clase_armadura: z.number().int().min(1, 'Mínimo 1').max(30, 'Máximo 30'),
  acciones: z.array(accionSchema).min(1, 'Agrega al menos una acción'),
})

export type HechizoForm = z.infer<typeof hechizoSchema>
export type ObjetoForm = z.infer<typeof objetoSchema>
export type MonstruoForm = z.infer<typeof monstruoSchema>
