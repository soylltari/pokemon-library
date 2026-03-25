import { getTranslations } from 'next-intl/server'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { fetchPokemonList, POKEMON_QUERY_KEY } from '@/app/entities/api/pokemon/pokemon.api'
import { PokemonListComponent } from '@/app/modules/pokemon-list'
import { getQueryClient } from '@/pkg/rest-api'

export const revalidate = 3600

const PokemonItemsPage = async () => {
  const t = await getTranslations('library')
  const queryClient = getQueryClient()

  await queryClient.prefetchInfiniteQuery({
    queryKey: POKEMON_QUERY_KEY,
    queryFn: ({ pageParam }) => fetchPokemonList(pageParam as number),
    initialPageParam: 0,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <h1 className='my-10 text-center'>{t('title')}</h1>
      <PokemonListComponent />
    </HydrationBoundary>
  )
}
export default PokemonItemsPage
