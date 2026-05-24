export interface Conjuro {
  id: number
  nombre: string
  nivel: number
  escuela: string
  concentracion: boolean
  descripcion: string
}

export interface Monstruo {
  id: number
  nombre: string
  clase_armadura: number
  puntos_golpe: number
  fuerza: number
  destreza: number
  constitucion: number
  inteligencia: number
  sabiduria: number
  carisma: number
  desafio: string
  acciones: unknown[]
  acciones_legendarias: unknown[]
}

export interface Objeto {
  id: number
  nombre: string
  categoria: string
  rareza: string
  es_magico: boolean
}

export type TipoContenido = 'conjuros' | 'monstruos' | 'objetos'

export interface CompendioFilters {
  tipo: TipoContenido
  busqueda: string
  escuelas: string[]
  niveles: number[]
  rangosCR: string[]
}
