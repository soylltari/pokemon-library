'use client'

import { useTranslations } from 'next-intl'
import type { FC } from 'react'
import { useCallback } from 'react'

import { usePokemonListQuery } from '@/app/entities/api'
import { useIntersection } from '@/app/shared/hooks'

import { PokemonCardComponent } from './elements'

// interface
interface IProps {}

// getPokemonId
const getPokemonId = (url: string): number => {
  const parts = url.split('/').filter(Boolean)

  return Number(parts[parts.length - 1])
}

// component
const PokemonListComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('library')

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePokemonListQuery()

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const sentinelRef = useIntersection(handleIntersect)

  const pokemon = data?.pages.flatMap((page) => page.results) ?? []

  // render
  return (
    <div className='mx-auto max-w-7xl px-4'>
      <h1 className='my-10 text-center'>{t('title')}</h1>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {pokemon.map(({ name, url }) => {
          const id = getPokemonId(url)

          return <PokemonCardComponent key={name} id={id} name={name} />
        })}
      </div>

      <div ref={sentinelRef} className='mt-8 flex justify-center py-6'>
        {isFetchingNextPage && <p className='text-muted-foreground text-sm'>{t('loading')}</p>}

        {!hasNextPage && pokemon.length > 0 && (
          <p className='text-muted-foreground text-sm'>{t('listEnd', { pokemon: pokemon.length })}</p>
        )}
      </div>
    </div>
  )
}

export default PokemonListComponent
