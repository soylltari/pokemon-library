"use client";

import type { ReactNode } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/pkg/theme/ui";
import { routing } from "@/pkg/locale";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/pkg/locale";

const LOCALE_LABELS: Record<string, string> = {
  en: "English",
  de: "Deutsch",
};

export const LanguageSwitcher = ({ trigger }: { trigger: ReactNode }) => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleChangeLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-50" align="end">
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={handleChangeLocale}
          className="space-y-1"
        >
          {routing.locales.map((loc) => (
            <DropdownMenuRadioItem
              key={loc}
              value={loc}
              className="data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground pl-2 text-base [&>span]:hidden"
            >
              {LOCALE_LABELS[loc] ?? loc}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
