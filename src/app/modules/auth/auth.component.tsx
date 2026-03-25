'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/pkg/theme/ui'

import { LoginFormComponent, RegisterFormComponent } from './elements'

const tabs = [
  {
    value: 'login',
    label: 'Sign In',
  },
  {
    value: 'register',
    label: 'Register',
  },
]

const AuthComponent = () => {
  return (
    <div className='mx-auto w-full max-w-sm'>
      <Tabs defaultValue='login' className='w-full'>
        <TabsList className='bg-background mb-4 grid w-full grid-cols-2 gap-1 border p-1'>
          {tabs.map((tab) => (
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
