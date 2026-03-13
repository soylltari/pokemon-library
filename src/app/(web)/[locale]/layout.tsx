import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { QueryProvider } from "@/app/shared/ui/providers";
import Header from "./index";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <QueryProvider>
        <Header />
        {children}
        <ReactQueryDevtools />
      </QueryProvider>
    </NextIntlClientProvider>
  );
}
