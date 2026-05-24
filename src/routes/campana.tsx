import { createFileRoute } from '@tanstack/react-router'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'

export const Route = createFileRoute('/campana')({ component: Campana })

function Campana() {
  return (
    <ProtectedRoute>
      <div className="text-white">Módulo de Campaña — próximamente</div>
    </ProtectedRoute>
  )
}
