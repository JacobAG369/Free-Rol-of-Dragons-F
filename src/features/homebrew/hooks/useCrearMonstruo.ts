import { useMutation } from '@tanstack/react-query'
import { monstruosApi } from '../api/monstruos.api'

export function useCrearMonstruo() {
  return useMutation({ mutationFn: monstruosApi.crear })
}
