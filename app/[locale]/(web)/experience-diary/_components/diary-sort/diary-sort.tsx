'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export type SortOption = 'latest' | 'oldest' | 'like'

type ExperienceSortProps = {
  currentSort: SortOption
  onSortChange: (sort: SortOption) => void
}

export const DiarySort = ({ currentSort, onSortChange }: ExperienceSortProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'latest', label: '新着順' },
    { value: 'like', label: '人気順' },
    { value: 'oldest', label: '古い順' },
  ]

  const currentLabel = sortOptions.find((option) => option.value === currentSort)?.label ?? '新着順'

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex w-full items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none'
        aria-haspopup='listbox'
        aria-expanded={isOpen}
      >
        <span>{currentLabel}</span>
        <ChevronDown className='ml-2 h-4 w-4' />
      </button>

      {isOpen && (
        <div className='absolute right-0 z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg'>
          <ul className='overflow-auto py-1 text-base' role='listbox'>
            {sortOptions.map((option) => (
              <li
                key={option.value}
                className={`relative cursor-pointer select-none px-4 py-2 text-sm hover:bg-gray-100 ${
                  currentSort === option.value ? 'font-medium text-[#ff7e8a]' : 'text-gray-700'
                }`}
                role='option'
                aria-selected={currentSort === option.value}
                onClick={() => {
                  onSortChange(option.value)
                  setIsOpen(false)
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
