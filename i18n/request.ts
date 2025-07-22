import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

// eslint-disable-next-line import/no-default-export
export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as never)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
