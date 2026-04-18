import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? 'ar'

  const validLocales = ['ar', 'en']
  const safeLocale = validLocales.includes(locale) ? locale : 'ar'

  return {
    locale: safeLocale,
    messages: (await import(`./messages/${safeLocale}.json`)).default
  }
})