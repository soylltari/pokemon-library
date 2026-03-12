import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

const locales = routing.locales;
type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  const raw = (await requestLocale) ?? routing.defaultLocale;
  const locale = (
    locales.includes(raw as Locale) ? raw : routing.defaultLocale
  ) as Locale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
