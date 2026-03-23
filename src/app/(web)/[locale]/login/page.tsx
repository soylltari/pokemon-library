import React from 'react'

import { AuthTabs } from '@/app/modules/auth/auth.module'

const LoginPage = async () => {
  return (
    <div className='flex min-h-[calc(100vh-67px)] items-center justify-center'>
      <AuthTabs />
    </div>
  )
}

export default LoginPage
