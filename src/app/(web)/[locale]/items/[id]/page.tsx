import type { Metadata, NextPage } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { fetchAllPokemonIds, fetchPokemonById } from '@/app/entities/api'
import { PokemonDetailComponent } from '@/app/modules/pokemon-detail'
import { routing } from '@/pkg/locale'

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

  let pokemon
  try {
    pokemon = await fetchPokemonById(id)
  } catch {
    notFound()
  }

  // render
  return <PokemonDetailComponent pokemon={pokemon} />
}

export default Page
