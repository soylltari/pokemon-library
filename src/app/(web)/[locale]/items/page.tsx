import type { NextPage } from 'next'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { fetchPokemonList, POKEMON_QUERY_KEY } from '@/app/entities/api/pokemon/pokemon.api'
import { PokemonListComponent } from '@/app/modules/pokemon-list'
import { getQueryClient } from '@/pkg/rest-api'

// interface
interface IProps {}

// revalidate
export const revalidate = 3600

// component
const Page: NextPage<Readonly<IProps>> = async () => {
  const queryClient = getQueryClient()

  await queryClient.prefetchInfiniteQuery({
    queryKey: POKEMON_QUERY_KEY,
    queryFn: ({ pageParam }) => fetchPokemonList(pageParam as number),
    initialPageParam: 0,
  })

  // render
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PokemonListComponent />
    </HydrationBoundary>
  )
}
export default Page
