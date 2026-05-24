import { createFileRoute } from '@tanstack/react-router'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { HomebrewPage } from '@/features/homebrew'

export const Route = createFileRoute('/homebrew')({ component: Homebrew })

function Homebrew() {
  return (
    <ProtectedRoute>
      <HomebrewPage />
    </ProtectedRoute>
  )
}
