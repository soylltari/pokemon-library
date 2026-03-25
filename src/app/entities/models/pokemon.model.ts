interface IPokemonListItem {
  name: string
  url: string
}

interface IPokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: IPokemonListItem[]
}

interface IPokemonSprites {
  front_default: string | null
  other: {
    'official-artwork': {
      front_default: string | null
    }
  }
}

interface IPokemon {
  id: number
  name: string
  sprites: IPokemonSprites
}

interface IPokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}

interface IPokemonStat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

interface IPokemonAbility {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

interface IPokemonDetails extends IPokemon {
  base_experience: number
  height: number
  weight: number
  types: IPokemonType[]
  stats: IPokemonStat[]
  abilities: IPokemonAbility[]
}

export type { IPokemon, IPokemonDetails, IPokemonListItem, IPokemonListResponse, IPokemonStat }
