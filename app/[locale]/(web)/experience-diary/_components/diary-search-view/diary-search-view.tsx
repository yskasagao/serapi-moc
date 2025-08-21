'use client'
import { DiaryListView } from '../diary-list-view'
import { DiarySearch } from '../diary-search'
import { ThemeSelector } from '../theme-selector'
import { useMediaQuery } from '@/lib/use-media-query'
import { useState, useEffect } from 'react'
import { DiarySort } from '@/app/[locale]/(web)/experience-diary/_components/diary-sort'
import { type DiaryPagination } from '@/app/api/experience-diary/search/schema'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { SlidersHorizontal } from 'lucide-react'

export const DiarySearchView = (props: DiaryPagination) => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [showFilters, setShowFilters] = useState(false)
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null)
  
  // テーマが選択されたときにURLパラメータを更新
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (selectedThemeId) {
      params.set('themeId', selectedThemeId)
    } else {
      params.delete('themeId')
    }
    // ページをリセット
    params.delete('cursor')
    router.replace(`${pathname}?${params.toString()}`)
  }, [selectedThemeId, pathname, router, searchParams])
  return (
    <>
      <ThemeSelector
        selectedThemeId={selectedThemeId}
        onThemeSelect={setSelectedThemeId}
      />
      <nav className='mb-6'>
        <div className='flex flex-col items-start gap-4 md:flex-row md:items-center'>
          <div className='flex-1'>
            <DiarySearch initialQuery='' />
          </div>
          <div className='flex items-center gap-2'>
            {isMobile && (
              <Button
                variant='outline'
                size='icon'
                onClick={() => setShowFilters(!showFilters)}
                className='md:hidden'
              >
                <SlidersHorizontal className='h-4 w-4' />
              </Button>
            )}
            <div className={`${isMobile && !showFilters ? 'hidden' : 'block'}`}>
              <DiarySort
                currentSort={props.sort}
                onSortChange={(v) => {
                  const params = new URLSearchParams(searchParams)
                  params.set('sort', v)
                  // テーマフィルタも保持
                  if (selectedThemeId) {
                    params.set('themeId', selectedThemeId)
                  }
                  router.replace(`${pathname}?${params.toString()}`)
                }}
              />
            </div>
          </div>
        </div>
      </nav>
      <DiaryListView {...props} />
    </>
  )
}
