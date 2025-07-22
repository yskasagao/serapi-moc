import { Form } from './_components/form'
import { Breadcrumb } from '@/app/_components/breadcrumb/breadcrumb'
import { presetUserIconMap } from '@/lib/constants'
import { getUserOrRedirect } from '@/lib/get-user-or-redirect'
import prisma from '@/lib/prisma'

type Props = {
  params: Promise<{ slug: string }>
}

const getRandomArbitrary = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const Page = async (props: Props) => {
  const params = await props.params
  const loginUser = await getUserOrRedirect()
  const serapistar = await prisma.serapistar.findFirstOrThrow({
    select: {
      nickname: true,
    },
    where: {
      slug: params.slug,
      isActive: true,
    },
  })
  const anonymousIcon = presetUserIconMap.get(getRandomArbitrary(1, presetUserIconMap.size + 1))
  return (
    <div className='mx-auto max-w-[380px] px-4'>
      <Breadcrumb
        items={[
          { link: `/therapists/${params.slug}`, label: serapistar.nickname },
          { label: 'コメント投稿' },
        ]}
      />
      <Form user={loginUser} targetSlug={params.slug} anonymousIcon={anonymousIcon ?? ''} />
    </div>
  )
}

export default Page
