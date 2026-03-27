'use client'

import type { FC } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/pkg/theme/ui/tabs'

import { LoginFormComponent, RegisterFormComponent } from './elements'

interface IProps {}

const TABS = [
  {
    value: 'login',
    label: 'Sign In',
  },
  {
    value: 'register',
    label: 'Register',
  },
]

const AuthComponent: FC<Readonly<IProps>> = () => {
  return (
    <div className='mx-auto w-full max-w-sm'>
      <Tabs defaultValue='login' className='w-full'>
        <TabsList className='bg-background mb-4 grid w-full grid-cols-2 gap-1 border p-1'>
          {TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className='data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground p-0 dark:data-[state=active]:border-transparent'
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value='login'>
          <LoginFormComponent />
        </TabsContent>

        <TabsContent value='register'>
          <RegisterFormComponent />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AuthComponent
