import type { NextPage } from 'next'
import { cookies } from 'next/headers'

import { redirect } from '@/pkg/locale'
import { routing } from '@/pkg/locale'

// interface
interface IProps {}

// component
const Page: NextPage<Readonly<IProps>> = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  return redirect({ href: `/${token ? 'items' : 'login'}`, locale: routing.defaultLocale })
}

export default Page
