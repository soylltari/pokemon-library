'use client'

import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'

import { fetchPokemonList } from './pokemon.api'

import { IPokemonListResponse } from '../../models/pokemon.model'

// query keys
export const pokemonKeys = {
  all: ['pokemon'] as const,
  list: () => [...pokemonKeys.all, 'list'] as const,
  detail: (id: string | number) => [...pokemonKeys.all, 'detail', id] as const,
}

// query options
const getListNextPageParam = (lastPage: IPokemonListResponse): number | undefined => {
  if (!lastPage.next) return undefined

  const url = new URL(lastPage.next)

  return Number(url.searchParams.get('offset'))
}

export const pokemonListOptions = () => {
  return infiniteQueryOptions({
    queryKey: pokemonKeys.list(),
    queryFn: ({ pageParam }) => fetchPokemonList(pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => getListNextPageParam(lastPage),
  })
}

// use query
export const usePokemonListQuery = () => useInfiniteQuery(pokemonListOptions())
