import { createFileRoute } from '@tanstack/react-router'
import { CompendioPage } from '@/features/compendio'

export const Route = createFileRoute('/compendio')({ component: CompendioPage })
