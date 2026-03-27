import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import type { ReactNode } from 'react'

import HeaderComponent from '@/app/widgets/header/header.component'
import { inter, montserrat } from '@/config/fonts'
import { routing } from '@/pkg/locale'
import { RestApiProvider } from '@/pkg/rest-api'

import '@/config/styles/globals.css'

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
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

// component
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const messages = await getMessages()

  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.has('auth-token')

  // render
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <RestApiProvider>
        <html lang={locale} className={`${inter.variable} ${montserrat.variable}`}>
          <body suppressHydrationWarning className='antialiased'>
            <HeaderComponent isAuthenticated={isAuthenticated} />

            {children}
          </body>
        </html>
      </RestApiProvider>
    </NextIntlClientProvider>
  )
}
