"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  fetchPokemonById,
  fetchPokemonList,
  POKEMON_DETAIL_QUERY_KEY,
  POKEMON_QUERY_KEY,
} from "./pokemon.api";

export const usePokemonListQuery = () =>
  useInfiniteQuery({
    queryKey: POKEMON_QUERY_KEY,
    queryFn: ({ pageParam }) => fetchPokemonList(pageParam),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      return Number(url.searchParams.get("offset"));
    },
    initialPageParam: 0,
  });

export const usePokemonByIdQuery = (id: string | number) =>
  useQuery({
    queryKey: [...POKEMON_DETAIL_QUERY_KEY, id],
    queryFn: () => fetchPokemonById(id),
    retry: false,
  });
