import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'

// interface
interface IProps {}

// component
const NotFoundComponent: FC<Readonly<IProps>> = () => {
  const t = useTranslations('notFound')

  // render
  return (
    <div className='flex min-h-[calc(100vh-100px)] flex-col items-center justify-center'>
      <Image src='/error-pokemon.png' alt='Not Found' width={200} height={200} />

      <h1>{t('title')}</h1>

      <p className='text-gray-500'>{t('description')}</p>
    </div>
  )
}

export default NotFoundComponent
