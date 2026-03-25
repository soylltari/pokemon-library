import React from 'react'

import { AuthComponent } from '@/app/modules/auth'

const LoginPage = () => {
  return (
    <div className='flex min-h-[calc(100vh-67px)] items-center justify-center'>
      <AuthComponent />
    </div>
  )
}

export default LoginPage
