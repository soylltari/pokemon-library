import { Inter, Montserrat } from 'next/font/google'

const primaryFont = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

const secondaryFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export { primaryFont, secondaryFont }
