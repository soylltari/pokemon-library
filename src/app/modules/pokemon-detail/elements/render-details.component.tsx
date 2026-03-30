'use client'

import { ArrowLeftIcon } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'

import type { IPokemonDetails } from '@/app/entities/models/pokemon.model'
import { Link } from '@/pkg/locale'
import { Badge } from '@/pkg/theme/ui/badge'
import { Button } from '@/pkg/theme/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/pkg/theme/ui/card'

import StatBlockComponent from './stat-block.component'
import { TYPE_COLORS } from './stat-block.constant'

// interface
interface IProps {
  pokemon: IPokemonDetails
}

// component
const RenderDetailsComponent: FC<Readonly<IProps>> = (props: IProps) => {
  const { pokemon } = props

  const t = useTranslations('detail')

  const artwork = pokemon.sprites.other['official-artwork'].front_default ?? pokemon.sprites.front_default

  // render
  return (
    <div className='mx-auto max-w-7xl px-4 py-4 md:px-10 md:py-6'>
      <div className='mb-4'>
        <Link href='/items'>
          <Button variant='ghost' size='sm' className='text-muted-foreground gap-1.5 px-2'>
            <ArrowLeftIcon className='h-4 w-4' />

            <span>{t('back')}</span>
          </Button>
        </Link>
      </div>

      <section className='flex flex-col items-center gap-10 md:flex-row md:gap-16'>
        <div className='relative flex h-72 w-72 shrink-0 items-center justify-center md:h-96 md:w-96'>
          <div className='bg-accent absolute inset-0 rounded-full' />
          {artwork && (
            <Image
              src={artwork}
              alt={pokemon.name}
              width={320}
              height={320}
              className='relative z-10 h-full w-full object-contain drop-shadow-xl'
              priority
            />
          )}
        </div>

        <div className='flex min-w-0 flex-1 flex-col gap-6'>
          <div>
            <p className='text-muted-foreground mb-1 font-medium'>#{String(pokemon.id).padStart(3, '0')}</p>

            <h1>{pokemon.name}</h1>

            {pokemon.types && (
              <div className='mt-3 flex gap-2'>
                {pokemon.types.map(({ type }) => (
                  <Badge
                    key={type.name}
                    variant='outline'
                    className={`border px-2.5 py-0.5 capitalize ${TYPE_COLORS[type.name] ?? ''}`}
                  >
                    {type.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className='grid grid-cols-3 gap-3'>
            <Card size='sm'>
              <CardContent className='pt-3'>
                <p className='text-2xl font-bold'>{pokemon.height / 10}m</p>
                <p className='text-muted-foreground mt-0.5 text-sm'>{t('height')}</p>
              </CardContent>
            </Card>

            <Card size='sm'>
              <CardContent className='pt-3'>
                <p className='text-2xl font-bold'>{pokemon.weight / 10}kg</p>
                <p className='text-muted-foreground mt-0.5 text-sm'>{t('weight')}</p>
              </CardContent>
            </Card>

            <Card size='sm'>
              <CardContent className='pt-3'>
                <p className='text-2xl font-bold'>{pokemon.base_experience}</p>
                <p className='text-muted-foreground mt-0.5 text-sm'>{t('baseExperience')}</p>
              </CardContent>
            </Card>
          </div>

          {pokemon.stats && (
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className='text-sm font-medium tracking-wider uppercase'>{t('baseStats')}</CardTitle>
                </CardHeader>

                <CardContent>
                  <div className='grid grid-cols-3 gap-3'>
                    {pokemon.stats.map((stat) => (
                      <StatBlockComponent key={stat.stat.name} stat={stat} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {pokemon.abilities && (
            <Card size='sm'>
              <CardHeader>
                <CardTitle className='text-sm font-medium tracking-wider uppercase'>{t('abilities')}</CardTitle>
              </CardHeader>

              <CardContent>
                <div className='flex flex-wrap gap-2'>
                  {pokemon.abilities.map(({ ability, is_hidden }) => (
                    <Badge key={ability.name} variant='outline' className='capitalize'>
                      {ability.name}

                      {is_hidden && <span className='text-muted-foreground ml-1 text-[10px]'>{t('hiddenLabel')}</span>}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  )
}

export default RenderDetailsComponent
