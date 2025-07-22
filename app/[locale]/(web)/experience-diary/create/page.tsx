import { Form } from './_components/form'
import { getUserOrRedirect } from '@/lib/get-user-or-redirect'
import type { Metadata } from 'next'
import { APP_NAME } from '@/lib/constants'

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: `セラピスト体験日記作成 | ${APP_NAME}`,
    robots: {
      index: false,
    },
  }
}

export default async function Page() {
  const user = await getUserOrRedirect()
  return <Form userName={user.name ?? ''} />
}
