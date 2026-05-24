export const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api/v1'

export interface PagedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export async function apiFetch<T>(
  path: string,
  params: Record<string, string | number | undefined> = {},
): Promise<PagedResponse<T>> {
  const url = new URL(`${API_BASE}${path}`)
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== '') url.searchParams.set(k, String(v))
  })
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`API error ${res.status}`)
  return res.json()
}
