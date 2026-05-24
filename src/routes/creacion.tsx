import { createFileRoute } from '@tanstack/react-router'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'

export const Route = createFileRoute('/creacion')({ component: Creacion })

function Creacion() {
  return (
    <ProtectedRoute>
      <div className="text-white">Centro de Creación — próximamente</div>
    </ProtectedRoute>
  )
}
