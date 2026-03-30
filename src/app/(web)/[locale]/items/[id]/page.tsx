import type { Metadata, NextPage } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { fetchAllPokemonIds, fetchPokemonById, pokemonDetailOptions } from '@/app/entities/api'
import PokemonDetailComponent from '@/app/modules/pokemon-detail/pokemon-detail.component'
import { routing } from '@/pkg/locale'
import { getQueryClient } from '@/pkg/rest-api'

// interface
interface IProps {
  params: Promise<{ id: string; locale: string }>
}

// revalidate
export const revalidate = 3600

// generateStaticParams
export const generateStaticParams = async () => {
  const ids = await fetchAllPokemonIds()

  return routing.locales.flatMap((locale) => ids.map((id) => ({ locale, id: String(id) })))
}

// metadata
export const generateMetadata = async ({ params }: IProps): Promise<Metadata> => {
  const { id } = await params

  const t = await getTranslations('metadata')

  try {
    const pokemon = await fetchPokemonById(id)

    const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)

    return {
      title: `${capitalizedName} - ${t('appName')}`,
      description: `${t('descriptionPrefix')} #${String(pokemon.id).padStart(3, '0')} - ${capitalizedName}`,
    }
  } catch {
    return {
      title: t('notFound.title'),
      description: t('notFound.description'),
    }
  }
}

// component
const Page: NextPage<Readonly<IProps>> = async (props: IProps) => {
  const { params } = props

  const { id } = await params

  const queryClient = getQueryClient()

  try {
    await queryClient.fetchQuery(pokemonDetailOptions(id))
  } catch {
    notFound()
  }

  // render
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PokemonDetailComponent id={id} />
    </HydrationBoundary>
  )
}

export default Page
