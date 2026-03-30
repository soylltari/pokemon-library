'use client'

import type { FC } from 'react'

import { usePokemonDetailQuery } from '@/app/entities/api'

import { RenderDetailsComponent } from './elements'

// interface
interface IProps {
  id: string
}

// component
const PokemonDetailComponent: FC<Readonly<IProps>> = (props) => {
  const { id } = props

  const { data } = usePokemonDetailQuery(id)

  if (!data) {
    return null
  }

  return <RenderDetailsComponent pokemon={data} />
}

export default PokemonDetailComponent
