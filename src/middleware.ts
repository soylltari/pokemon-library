import { type NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { routing } from './pkg/locale'

const intlMiddleware = createMiddleware(routing)

const PROTECTED_SEGMENTS = ['/items']
const AUTH_SEGMENTS = ['/login']

// isProtectedPath - function to check if the path is protected
function isProtectedPath(pathname: string): boolean {
  return routing.locales.some((locale) => {
    const withoutLocale = pathname.replace(new RegExp(`^/${locale}`), '')
    return PROTECTED_SEGMENTS.some((segment) => withoutLocale === segment || withoutLocale.startsWith(`${segment}/`))
  })
}

// isAuthPath - function to check if the path is an auth page
function isAuthPath(pathname: string): boolean {
  return routing.locales.some((locale) => {
    const withoutLocale = pathname.replace(new RegExp(`^/${locale}`), '')
    return AUTH_SEGMENTS.some((segment) => withoutLocale === segment || withoutLocale.startsWith(`${segment}/`))
  })
}

// middleware
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.has('auth-token')

  const locale = pathname.split('/')[1]
  const validLocale = (routing.locales as readonly string[]).includes(locale) ? locale : routing.defaultLocale

  if (isProtectedPath(pathname) && !token) {
    return NextResponse.redirect(new URL(`/${validLocale}/login`, request.url))
  }

  if (isAuthPath(pathname) && token) {
    return NextResponse.redirect(new URL(`/${validLocale}/items`, request.url))
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}
