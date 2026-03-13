import type { IPokemonListResponse } from "../../models/pokemon.model";

const BASE_URL = "https://pokeapi.co/api/v2";
const LIMIT = 20;

export const POKEMON_QUERY_KEY = ["pokemon"] as const;

export const fetchPokemonList = async (
  offset: number,
): Promise<IPokemonListResponse> => {
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${LIMIT}&offset=${offset}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch pokemon list");
  }

  return response.json();
};
