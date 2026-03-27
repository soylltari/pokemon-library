'use client'

import { useLocale } from 'next-intl'
import type { FC, ReactNode } from 'react'

import { routing } from '@/pkg/locale'
import { usePathname, useRouter } from '@/pkg/locale'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/pkg/theme/ui/dropdown-menu'

// interface
interface IProps {
  trigger: ReactNode
}

// constants
const LOCALE_LABELS: Record<string, string> = {
  en: 'English',
  de: 'Deutsch',
}

// component
const LanguageSwitcherComponent: FC<Readonly<IProps>> = (props: IProps) => {
  const { trigger } = props

  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const handleChangeLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  // render
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className='w-50' align='end'>
        <DropdownMenuRadioGroup value={locale} onValueChange={handleChangeLocale} className='space-y-1'>
          {routing.locales.map((loc) => (
            <DropdownMenuRadioItem
              key={loc}
              value={loc}
              className='data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground pl-2 text-base [&>span]:hidden'
            >
              {LOCALE_LABELS[loc] ?? loc}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageSwitcherComponent
