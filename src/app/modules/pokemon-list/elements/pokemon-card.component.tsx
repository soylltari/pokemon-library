'use client'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

import { envClient } from '@/config/env/env.client'
import { Link } from '@/pkg/locale'
import { Card, CardContent } from '@/pkg/theme/ui'

interface IPokemonCardProps {
  id: number
  name: string
}

interface ICardTransform {
  rotateX: number
  rotateY: number
  scale: number
}

const PokemonCard = ({ id, name }: IPokemonCardProps) => {
  const spriteUrl = `${envClient.NEXT_PUBLIC_IMAGE_BASE_URL}/${id}.png`
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)

  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const lastMousePosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const card = cardRef.current
    const image = imageRef.current

    if (!card || !image) return

    let rect: DOMRect
    let centerX: number
    let centerY: number

    const updateCardTransform = (mouseX: number, mouseY: number) => {
      if (!rect) {
        rect = card.getBoundingClientRect()
        centerX = rect.left + rect.width / 2
        centerY = rect.top + rect.height / 2
      }

      const relativeX = mouseX - centerX
      const relativeY = mouseY - centerY

      const cardTransform: ICardTransform = {
        rotateX: -relativeY * 0.045,
        rotateY: relativeX * 0.045,
        scale: 1.03,
      }

      const imageTransform: ICardTransform = {
        rotateX: -relativeY * 0.032,
        rotateY: relativeX * 0.032,
        scale: 1.2,
      }

      return { cardTransform, imageTransform }
    }

    const animate = () => {
      const { cardTransform, imageTransform } = updateCardTransform(
        lastMousePosition.current.x,
        lastMousePosition.current.y,
      )

      card.style.transform = `perspective(1000px) rotateX(${cardTransform.rotateX}deg) rotateY(${cardTransform.rotateY}deg) scale3d(${cardTransform.scale}, ${cardTransform.scale}, ${cardTransform.scale})`
      card.style.boxShadow = '0 10px 35px rgba(0, 0, 0, 0.2)'

      image.style.transform = `perspective(1000px) rotateX(${imageTransform.rotateX}deg) rotateY(${imageTransform.rotateY}deg) scale3d(${imageTransform.scale}, ${imageTransform.scale}, ${imageTransform.scale})`

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      lastMousePosition.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseEnter = () => {
      card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease'
      image.style.transition = 'transform 0.2s ease'
      animate()
    }

    const handleMouseLeave = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
      card.style.boxShadow = 'none'
      card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease'

      image.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
      image.style.transition = 'transform 0.5s ease'
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <Link href={`/items/${id}`}>
      <Card ref={cardRef} className='relative h-80 cursor-pointer overflow-hidden rounded-2xl'>
        <Image ref={imageRef} src={spriteUrl} alt={name} fill className='z-10 object-contain p-4' />

        <CardContent className='relative z-0 flex h-full items-start p-4'>
          <p className='bg-accent w-full rounded-2xl p-1 text-center text-lg font-semibold tracking-wide drop-shadow-md'>
            {capitalizedName}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}

export default PokemonCard
