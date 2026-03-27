'use client'
import { LanguagesIcon, LogOutIcon } from 'lucide-react'
import Image from 'next/image'

import { useAuthStore } from '@/app/shared/store'
import { Link, useRouter } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui'

import { LanguageSwitcherComponent } from './elements'

const HeaderComponent = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const logout = useAuthStore((s) => s.logout)
  const clientAuthenticated = useAuthStore((s) => s.isAuthenticated)

  const isAuth = isAuthenticated || clientAuthenticated

  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.replace('/login')
  }

  return (
    <header className='bg-card sticky top-0 z-50 border-b'>
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6'>
        <Link href='/items'>
          <Image src='/poke-ball.png' alt='Logo' width={50} height={50} />
        </Link>

        <div className='flex items-center gap-1.5'>
          <LanguageSwitcherComponent
            trigger={
              <Button variant='ghost' size='icon' aria-label='Language Switcher'>
                <LanguagesIcon />
              </Button>
            }
          />

          {isAuth && (
            <Button variant='ghost' size='icon' onClick={handleLogout}>
              <LogOutIcon />
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default HeaderComponent
