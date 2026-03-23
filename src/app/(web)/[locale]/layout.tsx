import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Header } from '@/app/widgets/header'
import { inter, montserrat } from '@/config/fonts'
import { routing } from '@/pkg/locale'
import { QueryProvider } from '@/pkg/rest-api'

import '@/config/styles/globals.css'

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('metadata')

  return {
    title: t('appName'),
    description: t('description'),
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
      <QueryProvider>
        <html lang={locale} className={`${inter.variable} ${montserrat.variable}`}>
          <body suppressHydrationWarning className='antialiased'>
            <Header />
            {children}
          </body>
        </html>
        {/* <ReactQueryDevtools /> */}
      </QueryProvider>
    </NextIntlClientProvider>
  )
}
