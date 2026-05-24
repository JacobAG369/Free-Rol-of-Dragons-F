import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/creacion')({ component: Creacion })

function Creacion() {
  return <div className="text-white">Creación — próximamente</div>
}
