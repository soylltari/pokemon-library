import type { NextPage } from 'next'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { pokemonListOptions } from '@/app/entities/api/pokemon'
import { PokemonListComponent } from '@/app/modules/pokemon-list'
import { getQueryClient } from '@/pkg/rest-api'

// interface
interface IProps {}

// revalidate
export const revalidate = 3600

// component
const Page: NextPage<Readonly<IProps>> = async () => {
  const queryClient = getQueryClient()

  await queryClient.prefetchInfiniteQuery(pokemonListOptions())

  // render
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PokemonListComponent />
    </HydrationBoundary>
  )
}
export default Page
