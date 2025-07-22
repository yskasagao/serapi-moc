import type { inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '@/lib/trpc/routers/_app'

export type ArrayElement<ArrayType extends unknown[] | null> =
  ArrayType extends (infer ElementType)[] ? ElementType : never

// type RouterInput = inferRouterInputs<AppRouter>
type RouterOutput = inferRouterOutputs<AppRouter>

// export type UserFindBySlugOutput = RouterOutput['user']['findBySlug']
//
// export type ListUser = ArrayElement<RouterOutput['user']['listUsers']['users']>

export type ListSerapist = ArrayElement<RouterOutput['serapist']['listSerapist']['users']>
export type ListActiveSerapist = ArrayElement<
  RouterOutput['serapist']['listActiveSerapist']['results']
>
export type ListShop = ArrayElement<RouterOutput['shop']['listShop']['shops']>
