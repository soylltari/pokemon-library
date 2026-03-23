'use client'

import { useInfiniteQuery } from '@tanstack/react-query'

import { fetchPokemonList, POKEMON_QUERY_KEY } from './pokemon.api'

export const usePokemonListQuery = () =>
  useInfiniteQuery({
    queryKey: POKEMON_QUERY_KEY,
    queryFn: ({ pageParam }) => fetchPokemonList(pageParam),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined
      const url = new URL(lastPage.next)
      return Number(url.searchParams.get('offset'))
    },
    initialPageParam: 0,
  })
