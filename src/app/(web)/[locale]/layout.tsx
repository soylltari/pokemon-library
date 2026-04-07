import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { FC, ReactNode } from 'react'

import HeaderComponent from '@/app/widgets/header/header.component'
import { primaryFont, secondaryFont } from '@/config/fonts'
import { routing } from '@/pkg/locale'
import { RestApiProvider } from '@/pkg/rest-api'

import '@/config/styles/globals.css'

// interface
interface IProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

// metadata
export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('metadata')

  return {
    title: t('appName'),
    description: t('description'),
    icons: {
      icon: '/icon.png',
    },
  }
}

// generateStaticParams
export const generateStaticParams = async () => {
  return routing.locales.map((locale) => ({ locale }))
}

// component
const LocaleLayout: FC<Readonly<IProps>> = async (props: IProps) => {
  const { children, params } = props

  const { locale } = await params

  setRequestLocale(locale)

  // render
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${primaryFont.variable} ${secondaryFont.variable}`} suppressHydrationWarning>
        <NextIntlClientProvider>
          <HeaderComponent />

          <RestApiProvider>{children}</RestApiProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default LocaleLayout
