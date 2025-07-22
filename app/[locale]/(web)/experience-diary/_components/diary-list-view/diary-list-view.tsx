'use client'
import { DiaryCard } from '../diary-card'
import { useEffect, useRef, useState } from 'react'
import { useInfiniteScroll } from '@/lib/use-infinite-scroll'
import { type ReadonlyURLSearchParams, usePathname, useSearchParams } from 'next/navigation'
import { type DiaryPagination, type Diary } from '@/app/api/experience-diary/search/schema'

const loadMore = async (
  currentParams: ReadonlyURLSearchParams,
  nextCursor: string,
): Promise<DiaryPagination> => {
  const params = new URLSearchParams(currentParams)
  params.set('cursor', nextCursor)
  const ret = await fetch(`/api/experience-diary/search?${params.toString()}`, {
    method: 'GET',
  })
  return (await ret.json()) as DiaryPagination
}
export const DiaryListView = (props: DiaryPagination) => {
  const pathname = usePathname()
  const [renderData, setRenderData] = useState<Diary[]>(props.data)
  const [nextCursor, setNextCursor] = useState(props.nextCursor)
  const searchParams = useSearchParams()
  const target = useRef<HTMLDivElement | null>(null)
  useInfiniteScroll<HTMLDivElement>({
    target,
    hasMore: nextCursor !== undefined,
    onIntersect: () => {
      if (nextCursor === undefined) {
        return
      }
      loadMore(searchParams, nextCursor)
        .then((v) => {
          setRenderData((p) => {
            return [...p, ...v.data]
          })
          setNextCursor(v.nextCursor)
        })
        .catch(console.error)
    },
  })
  useEffect(() => {
    setRenderData(props.data)
    setNextCursor(props.nextCursor)
  }, [pathname, props.data, props.nextCursor])
  if (props.data.length === 0) {
    return (
      <div className='rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm'>
        <p className='text-gray-500'>該当する体験日記がありません。</p>
      </div>
    )
  }
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
      {renderData.map((diary: Diary) => (
        <DiaryCard diary={diary} key={diary.id} />
      ))}
      <div ref={target} />
    </div>
  )
}
