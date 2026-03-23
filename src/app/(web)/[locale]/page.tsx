import { cookies } from 'next/headers'

import { redirect } from '@/pkg/locale'
import { routing } from '@/pkg/locale'

export default async function RootPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  return redirect({ href: `/${token ? 'items' : 'login'}`, locale: routing.defaultLocale })
}
