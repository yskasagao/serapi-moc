import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// eslint-disable-next-line import/no-default-export
export default createMiddleware(routing)

export const config = {
  // Match only internationalized pathnames
  // matcher: ['/', '/(ja|ch)/:path*'],
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // However, match all pathnames within `/users`, optionally with a locale prefix
    // '/([\\w-]+)?/users/(.+)',
  ],
}
