import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { fetchAllPokemonIds, fetchPokemonById } from '@/app/entities/api'
import { PokemonDetailComponent } from '@/app/modules/pokemon-detail'
import { routing } from '@/pkg/locale'

export const revalidate = 3600

export const generateStaticParams = async () => {
  const ids = await fetchAllPokemonIds()

  return routing.locales.flatMap((locale) => ids.map((id) => ({ locale, id: String(id) })))
}

type Props = {
  params: Promise<{ id: string; locale: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
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

const Page = async ({ params }: Props) => {
  const { id } = await params

  let pokemon
  try {
    pokemon = await fetchPokemonById(id)
  } catch {
    notFound()
  }

  return <PokemonDetailComponent pokemon={pokemon} />
}

export default Page
