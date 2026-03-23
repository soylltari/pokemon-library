'use client'
import { LanguagesIcon, LogOutIcon } from 'lucide-react'
import Image from 'next/image'
import { useSyncExternalStore } from 'react'

import { useAuthStore } from '@/app/shared/store/auth.store'
import { Link, useRouter } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui'

import { LanguageSwitcher } from './elements'

export const Header = () => {
  const logout = useAuthStore((s) => s.logout)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const router = useRouter()

  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  const handleLogout = () => {
    logout()
    router.replace('/login')
  }

  const showLogout = isMounted && isAuthenticated

  return (
    <header className='bg-card sticky top-0 z-50 border-b'>
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6'>
        <Link href='/items'>
          <Image src='/poke-ball.png' alt='Logo' width={50} height={50} />
        </Link>
        <div className='flex items-center gap-1.5'>
          <LanguageSwitcher
            trigger={
              <Button variant='ghost' size='icon' aria-label='Language Switcher'>
                <LanguagesIcon />
              </Button>
            }
          />

          {showLogout && (
            <Button variant='ghost' size='icon' onClick={handleLogout}>
              <LogOutIcon />
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
