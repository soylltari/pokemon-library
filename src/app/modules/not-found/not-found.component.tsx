import Image from 'next/image'
import { useTranslations } from 'next-intl'
import React from 'react'

const NotFoundComponent = () => {
  const t = useTranslations('notFound')

  return (
    <div className='flex min-h-[calc(100vh-100px)] flex-col items-center justify-center'>
      <Image src='/error-pokemon.png' alt='Not Found' width={200} height={200} />

      <h1>{t('title')}</h1>

      <p className='text-gray-500'>{t('description')}</p>
    </div>
  )
}

export default NotFoundComponent
