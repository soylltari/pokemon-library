import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'

import { fetchPokemonById, fetchPokemonList } from './pokemon.api'

import type { IPokemonListResponse } from '../../models/pokemon.model'

// query keys
export const pokemonKeys = {
  all: ['pokemon'] as const,
  list: () => [...pokemonKeys.all, 'list'] as const,
  detail: (id: string | number) => [...pokemonKeys.all, 'detail', id] as const,
}

// options
const getListNextPageParam = (lastPage: IPokemonListResponse): number | undefined => {
  if (!lastPage.next) return undefined

  const url = new URL(lastPage.next)

  return Number(url.searchParams.get('offset'))
}

export const pokemonListOptions = () =>
  infiniteQueryOptions({
    queryKey: pokemonKeys.list(),
    queryFn: ({ pageParam }) => fetchPokemonList(pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => getListNextPageParam(lastPage),
  })

export const pokemonDetailOptions = (id: string | number) =>
  queryOptions({
    queryKey: pokemonKeys.detail(id),
    queryFn: () => fetchPokemonById(id),
  })
