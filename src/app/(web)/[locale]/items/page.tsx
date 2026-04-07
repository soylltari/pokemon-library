import type { NextPage } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { pokemonListOptions } from '@/app/entities/api/pokemon'
import { PokemonListComponent } from '@/app/modules/pokemon-list'
import { getQueryClient } from '@/pkg/rest-api'

// interface
interface IProps {
  params: Promise<{ locale: string }>
}

// revalidate
export const revalidate = 3600

// component
const Page: NextPage<Readonly<IProps>> = async (props: IProps) => {
  const { params } = props

  const { locale } = await params
  setRequestLocale(locale)

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
