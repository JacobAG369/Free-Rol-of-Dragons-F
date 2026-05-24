import { z } from 'zod'

export const passwordSchema = z
  .string().trim()
  .min(8, 'Mínimo 8 caracteres')
  .regex(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
  .regex(/[a-z]/, 'Debe contener al menos una letra minúscula')
  .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un carácter especial')

export const loginSchema = z.object({
  email: z.email('Correo electrónico inválido').trim(),
  password: z.string().min(1, 'La contraseña es requerida'),
})

export const registerSchema = z.object({
  username: z
    .string().trim()
    .min(3, 'Mínimo 3 caracteres')
    .max(30, 'Máximo 30 caracteres')
    .regex(/^[A-Za-z0-9_]+$/, 'Solo letras, números y guión bajo'),
  email: z.email('Correo electrónico inválido').trim(),
  password: passwordSchema,
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
