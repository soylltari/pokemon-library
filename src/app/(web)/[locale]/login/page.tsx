import type { NextPage } from 'next'

import { AuthComponent } from '@/app/modules/auth'

// interface
interface IProps {}

// component

const Page: NextPage<Readonly<IProps>> = async () => {
  // render
  return (
    <div className='flex min-h-[calc(100vh-67px)] items-center justify-center'>
      <AuthComponent />
    </div>
  )
}

export default Page
