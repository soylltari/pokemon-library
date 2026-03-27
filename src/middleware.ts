import { type NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { routing } from './pkg/locale'

const intlMiddleware = createMiddleware(routing)

const PROTECTED_SEGMENTS = ['/items']

// isProtectedPath - function to check if the path is protected
function isProtectedPath(pathname: string): boolean {
  return routing.locales.some((locale) => {
    const withoutLocale = pathname.replace(new RegExp(`^/${locale}`), '')
    return PROTECTED_SEGMENTS.some((segment) => withoutLocale === segment || withoutLocale.startsWith(`${segment}/`))
  })
}

// middleware
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (isProtectedPath(pathname)) {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      const locale = pathname.split('/')[1]
      const validLocale = (routing.locales as readonly string[]).includes(locale) ? locale : routing.defaultLocale

      return NextResponse.redirect(new URL(`/${validLocale}/login`, request.url))
    }
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}
