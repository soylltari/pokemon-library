import { notFound } from 'next/navigation'

import { restApiFetcher } from '@/pkg/rest-api'

import type { IPokemonDetails, IPokemonListResponse } from '../../models/pokemon.model'

// constants
const LIMIT = 20

// fetchPokemonList
export const fetchPokemonList = async (offset: number): Promise<IPokemonListResponse> => {
  const response = await restApiFetcher.get('pokemon', {
    searchParams: { limit: LIMIT, offset },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch pokemon list')
  }

  return response.json()
}

// fetchPokemonById
export const fetchPokemonById = async (id: string | number): Promise<IPokemonDetails> => {
  const response = await restApiFetcher.get(`pokemon/${id}`)

  if (!response.ok) {
    notFound()
  }

  return response.json()
}

// fetchAllPokemonIds
export const fetchAllPokemonIds = async (): Promise<number[]> => {
  const response = await restApiFetcher.get('pokemon', {
    searchParams: { limit: 10000, offset: 0 },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch all pokemon ids')
  }

  const data: IPokemonListResponse = await response.json()

  return data.results.map((p) => {
    const parts = p.url.split('/')

    return Number(parts[parts.length - 2])
  })
}
