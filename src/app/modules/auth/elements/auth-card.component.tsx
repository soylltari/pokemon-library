import React, { ReactNode } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/pkg/theme/ui'

interface IAuthCardProps {
  title: string
  description: string
  children: ReactNode
}

const AuthCardComponent = ({ children, title, description }: IAuthCardProps) => {
  return (
    <div>
      <Card className='w-full max-w-sm bg-transparent shadow-none ring-0'>
        <CardHeader className='items-center gap-2 pb-2 text-center'>
          <CardTitle className='text-2xl font-bold'>{title}</CardTitle>

          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent>{children}</CardContent>
      </Card>
    </div>
  )
}

export default AuthCardComponent
