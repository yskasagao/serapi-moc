import './globals.css'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { getSessionWithDevBypass } from '@/lib/get-session-with-dev-bypass'
import { NextAuthProvider } from '@/providers/next-auth-provider'
import { APP_NAME } from '@/lib/constants'

export const metadata = {
  title: `TikTokで推しセラピスト探し - 女性用風俗のコミュニティサイト ${APP_NAME}`,
  description:
    'TikTokで推しの女性用風俗セラピストを見つけて応援。女子目線のリアルな口コミが見れて、推し活仲間も見つかるコミュニティサイトです。',
}

type Props = {
  children: React.ReactNode
  modal: React.ReactNode
  params: Promise<{ locale: string }>
}
export default async function RootLayout(props: Props) {
  const params = await props.params
  // Ensure that the incoming `locale` is valid

  if (!routing.locales.includes(params.locale as never)) {
    notFound()
  }
  const messages = await getMessages()
  const session = await getSessionWithDevBypass()
  return (
    <html lang={params.locale}>
      <body>
        {props.modal}
        <NextAuthProvider session={session}>
          <NextIntlClientProvider messages={messages}>
            <div className='w-full'>{props.children}</div>
          </NextIntlClientProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
