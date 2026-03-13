interface IPokemonListItem {
  name: string;
  url: string;
}

interface IPokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemonListItem[];
}

interface IPokemonSprites {
  front_default: string | null;
  other: {
    "official-artwork": {
      front_default: string | null;
    };
  };
}

interface IPokemon {
  id: number;
  name: string;
  sprites: IPokemonSprites;
}

export type { IPokemon, IPokemonListItem, IPokemonListResponse };
