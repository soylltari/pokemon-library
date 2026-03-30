'use client'

import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { pokemonDetailOptions, pokemonListOptions } from './pokemon.options'

// use queries
export const usePokemonListQuery = () => {
  return useInfiniteQuery(pokemonListOptions())
}

export const usePokemonDetailQuery = (id: string | number) => {
  return useQuery(pokemonDetailOptions(id))
}
