export const ESCUELAS_MAGIA = [
  'Abjuración', 'Conjuración', 'Adivinación', 'Encantamiento',
  'Evocación', 'Ilusión', 'Nigromancia', 'Transmutación',
] as const

export const CATEGORIAS_OBJETO = [
  'Arma', 'Armadura', 'Poción', 'Anillo', 'Varita',
  'Pergamino', 'Objeto maravilloso', 'Herramienta', 'Munición',
] as const

export interface HechizoPayload {
  nombre: string
  nivel: number
  escuela: string
  concentracion: boolean
}

export interface ObjetoPayload {
  nombre: string
  categoria: string
  es_magico: boolean
}

export interface AccionMonstruo {
  nombre: string
  descripcion: string
}

export interface MonstruoPayload {
  nombre: string
  clase_armadura: number
  acciones: AccionMonstruo[]
}
