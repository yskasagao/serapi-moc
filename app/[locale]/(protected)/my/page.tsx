import { MyPageView } from '@/app/[locale]/(protected)/my/_components/my-page-view'
import { fetchAdvertisements } from '@/app/[locale]/(protected)/my/fetch-advertisements'
import prisma from '@/lib/prisma'
import { getUserOrRedirect } from '@/lib/get-user-or-redirect'

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function Page(props: Props) {
  const loginUser = await getUserOrRedirect()
  
  // 開発環境でのモックユーザー対応: ユーザーが存在しない場合は自動作成
  let user = await prisma.user.findFirst({
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

  // 開発環境でユーザーが存在しない場合の自動作成
  if (!user && process.env.NODE_ENV === 'development' && process.env.USE_MOCK_DATA === 'true') {
    await prisma.user.create({
      data: {
        id: loginUser.id,
        name: loginUser.name || '開発用ユーザー',
        email: loginUser.email || 'dev@example.com',
        image: loginUser.image || 'https://via.placeholder.com/150',
        message: '開発用のユーザーです',
      },
    })
    
    // 作成後に再取得
    user = await prisma.user.findFirstOrThrow({
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
  }

  // ユーザーが見つからない場合のエラー処理
  if (!user) {
    throw new Error(`User not found: ${loginUser.id}`)
  }
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
