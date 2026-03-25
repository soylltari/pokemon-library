import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'

import HeaderComponent from '@/app/widgets/header/header.component'
import { inter, montserrat } from '@/config/fonts'
import { routing } from '@/pkg/locale'
import { RestApiProvider } from '@/pkg/rest-api'

import '@/config/styles/globals.css'

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <RestApiProvider>
        <html lang={locale} className={`${inter.variable} ${montserrat.variable}`}>
          <body suppressHydrationWarning className='antialiased'>
            <HeaderComponent />
            {children}
          </body>
        </html>
      </RestApiProvider>
    </NextIntlClientProvider>
  )
}
