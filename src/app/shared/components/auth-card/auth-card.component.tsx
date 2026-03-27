import type { FC, ReactNode } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/pkg/theme/ui/card'

// interface
interface IProps {
  title: string
  description: string
  children: ReactNode
}

// component
const AuthCardComponent: FC<Readonly<IProps>> = (props: IProps) => {
  const { children, title, description } = props

  // render
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
