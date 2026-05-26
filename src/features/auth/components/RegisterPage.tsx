import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerSchema, type RegisterFormValues } from '../types/auth.schemas'
import { useRegister } from '../hooks/useRegister'
import {
  ValidationHints,
  PASSWORD_RULES,
  USERNAME_RULES,
} from './ValidationHints'

type FieldErrors = Partial<Record<keyof RegisterFormValues, string>>
type Touched = Partial<Record<keyof RegisterFormValues, boolean>>

export function RegisterPage() {
  const navigate = useNavigate()
  const { mutate: register, isPending, error } = useRegister()
  const [form, setForm] = useState<RegisterFormValues>({ email: '', username: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState<Touched>({})

  const apiError = error
    ? (() => {
        try {
          const parsed = JSON.parse(error.message)
          const first = Object.values(parsed)[0]
          return Array.isArray(first) ? (first[0] as string) : 'Error al registrarse.'
        } catch {
          return 'Error al registrarse.'
        }
      })()
    : null

  function handleSubmit() {
    const result = registerSchema.safeParse(form)
    if (!result.success) {
      const errors: FieldErrors = {}
      result.error.issues.forEach((issue) => {
        const f = issue.path[0] as keyof RegisterFormValues
        if (!errors[f]) errors[f] = issue.message
      })
      setFieldErrors(errors)
      setTouched({ username: true, email: true, password: true })
      return
    }
    setFieldErrors({})
    register(result.data, { onSuccess: () => navigate({ to: '/' }) })
  }

  function field(name: keyof RegisterFormValues, value: string) {
    setForm((f) => ({ ...f, [name]: value }))
    if (fieldErrors[name]) setFieldErrors((e) => ({ ...e, [name]: undefined }))
  }

  function touch(name: keyof RegisterFormValues) {
    setTouched((t) => ({ ...t, [name]: true }))
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Card className="w-full max-w-md border-amber-200/15 bg-amber-100/5 text-white backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">Crear cuenta</CardTitle>
          <CardDescription className="text-white/50">
            Únete a la aventura de Free Rol of Dragons
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => { e.preventDefault(); handleSubmit() }}
            className="flex flex-col gap-4"
            noValidate
          >
            <div className="flex flex-col gap-1.5">
              <Label className="text-white/70">Nombre de aventurero</Label>
              <Input
                type="text"
                placeholder="Gandalf"
                value={form.username}
                onChange={(e) => field('username', e.target.value)}
                onFocus={() => touch('username')}
                className="border-amber-200/15 bg-amber-100/5 text-white placeholder:text-white/30 focus-visible:ring-amber-500/50"
              />
              <ValidationHints
                value={form.username}
                rules={USERNAME_RULES}
                visible={touched.username ?? false}
              />
              {fieldErrors.username && !touched.username && (
                <p className="text-xs text-red-400">{fieldErrors.username}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-white/70">Correo electrónico</Label>
              <Input
                type="email"
                placeholder="heroe@taverna.com"
                value={form.email}
                onChange={(e) => field('email', e.target.value)}
                onFocus={() => touch('email')}
                className="border-amber-200/15 bg-amber-100/5 text-white placeholder:text-white/30 focus-visible:ring-amber-500/50"
              />
              {fieldErrors.email && (
                <p className="text-xs text-red-400">{fieldErrors.email}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-white/70">Contraseña</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => field('password', e.target.value)}
                onFocus={() => touch('password')}
                className="border-amber-200/15 bg-amber-100/5 text-white placeholder:text-white/30 focus-visible:ring-amber-500/50"
              />
              <ValidationHints
                value={form.password}
                rules={PASSWORD_RULES}
                visible={touched.password ?? false}
              />
            </div>

            {apiError && (
              <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
                {apiError}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="mt-1 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-500 disabled:opacity-50"
            >
              {isPending ? 'Creando cuenta…' : 'Crear cuenta'}
            </button>

            <p className="text-center text-sm text-white/40">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-amber-400 hover:text-amber-300">
                Inicia sesión
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
