import { useMutation } from '@tanstack/react-query'
import { objetosApi } from '../api/objetos.api'

export function useCrearObjeto() {
  return useMutation({ mutationFn: objetosApi.crear })
}
