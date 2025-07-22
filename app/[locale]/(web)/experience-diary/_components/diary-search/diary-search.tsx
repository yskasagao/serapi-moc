'use client'

import { Search, X } from 'lucide-react'
import { useState, useRef } from 'react'
import { useDebounce } from 'react-use'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type ExperienceSearchProps = {
  initialQuery?: string
}

export const DiarySearch = ({ initialQuery = '' }: ExperienceSearchProps) => {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(initialQuery)
  const first = useRef(true)
  useDebounce(
    async () => {
      // 初回マウント時のから読み込み制御
      if (first.current) {
        first.current = false
        return
      }
      const params = new URLSearchParams(searchParams ?? {})

      if (query.length > 0) {
        params.set('q', query)
      } else {
        params.delete('q')
      }

      replace(`${pathname}?${params.toString()}`)
    },
    500,
    [query, searchParams, first],
  )

  const handleClear = () => {
    setQuery('')
  }

  return (
    <div className='relative'>
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='キーワードで検索'
          className='w-full rounded-md border border-gray-200 py-2 pl-10 pr-10 shadow-sm focus:border-[#ff7e8a] focus:outline-none focus:ring-1 focus:ring-[#ff7e8a]'
        />
        {query && (
          <button
            onClick={handleClear}
            className='absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600'
            aria-label='検索をクリア'
          >
            <X className='h-4 w-4' />
          </button>
        )}
      </div>
    </div>
  )
}
