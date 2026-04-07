'use client'
import { LanguagesIcon, LogOutIcon } from 'lucide-react'
import Image from 'next/image'
import { type FC, useSyncExternalStore } from 'react'

import { useAuthStore } from '@/app/shared/store'
import { Link, useRouter } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'

import { LanguageSwitcherComponent } from './elements'

// interface
interface IProps {}

// component
const HeaderComponent: FC<Readonly<IProps>> = () => {
  const logout = useAuthStore((s) => s.logout)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  const isAuth = isHydrated && isAuthenticated

  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.replace('/login')
  }

  // render
  return (
    <header className='bg-card sticky top-0 z-50 border-b'>
      <div className='layout-container flex items-center justify-between gap-6 py-2 sm:px-6'>
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
