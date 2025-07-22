import { MyPageView } from '@/app/[locale]/(protected)/my/_components/my-page-view'
import { fetchAdvertisements } from '@/app/[locale]/(protected)/my/fetch-advertisements'
import prisma from '@/lib/prisma'
import { getUserOrRedirect } from '@/lib/get-user-or-redirect'

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function Page(props: Props) {
  const loginUser = await getUserOrRedirect()
  const user = await prisma.user.findFirstOrThrow({
    select: {
      name: true,
      image: true,
      message: true,
      Comment: {
        where: {
          deletedAt: null,
        },
        orderBy: {
          id: 'desc',
        },
        select: {
          id: true,
          isPublic: true,
          text: true,
          createdAt: true,
          Serapistar: {
            select: {
              slug: true,
              nickname: true,
              avatar: true,
            },
          },
        },
      },
      Bookmark: {
        orderBy: {
          id: 'desc',
        },
        select: {
          Serapistar: {
            select: {
              slug: true,
              nickname: true,
              avatar: true,
              SerapisterParameter: {
                select: {
                  service: true,
                  like: true,
                  looks: true,
                  physical: true,
                  repeat: true,
                },
              },
              shop: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
    where: {
      id: loginUser.id,
    },
  })
  const adsResult = await fetchAdvertisements()
  const ads = adsResult.success ? adsResult.result : []
  const searchParams = await props.searchParams
  return (
    <MyPageView
      advertisements={ads}
      user={user}
      isOpenModalUserModal={searchParams?.first === 'on'}
    />
  )
}
