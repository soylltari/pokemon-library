import { restApiFetcher } from '@/pkg/rest-api'

import type { IPokemonDetails, IPokemonListResponse } from '../../models/pokemon.model'

const LIMIT = 20

export const POKEMON_QUERY_KEY = ['pokemon'] as const

export const fetchPokemonList = async (offset: number): Promise<IPokemonListResponse> => {
  const response = await restApiFetcher.get('pokemon', {
    searchParams: { limit: LIMIT, offset },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch pokemon list')
  }

  return response.json()
}

export const fetchPokemonById = async (id: string | number): Promise<IPokemonDetails> => {
  const response = await restApiFetcher.get(`pokemon/${id}`)

  if (!response.ok) {
    throw new Error(`Pokemon ${id} not found`)
  }

  return response.json()
}
