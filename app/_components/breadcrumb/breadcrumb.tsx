import Link from 'next/link'

type BreadcrumbItem = {
  link?: string
  label: string
}

type Props = {
  items: BreadcrumbItem[]
}

export const Breadcrumb = (props: Props) => {
  return (
    <nav className='flex p-2' aria-label='Breadcrumb'>
      <ol className='inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse'>
        <li className='inline-flex items-center'>
          <Link
            href='/'
            className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'
          >
            <svg
              className='me-2.5 h-3 w-3'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path d='m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z' />
            </svg>
            TOP
          </Link>
        </li>
        {props.items.map((v, index) => {
          return (
            <li key={index}>
              <div className='flex items-center'>
                <svg
                  className='mx-1 h-3 w-3 text-gray-400 rtl:rotate-180'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 6 10'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 9 4-4-4-4'
                  />
                </svg>
                {v.link ? (
                  <Link
                    href={v.link}
                    className='ms-1 max-w-[100px] truncate text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white'
                  >
                    {v.label}
                  </Link>
                ) : (
                  <span className='ms-1 max-w-[100px] truncate text-sm font-medium text-gray-700 md:ms-2 dark:text-gray-400 dark:hover:text-white'>
                    {v.label}
                  </span>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
