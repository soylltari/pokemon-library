import type { NextPage } from 'next'

import { AuthComponent } from '@/app/modules/auth'

interface IProps {}

const Page: NextPage<Readonly<IProps>> = async () => {
  return (
    <div className='flex min-h-[calc(100vh-67px)] items-center justify-center'>
      <AuthComponent />
    </div>
  )
}

export default Page
