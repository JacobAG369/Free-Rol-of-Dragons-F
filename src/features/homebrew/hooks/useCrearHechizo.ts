import { useMutation } from '@tanstack/react-query'
import { hechizosApi } from '../api/hechizos.api'

export function useCrearHechizo() {
  return useMutation({ mutationFn: hechizosApi.crear })
}
