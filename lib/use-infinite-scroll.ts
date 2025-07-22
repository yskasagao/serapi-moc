import { useEffect } from 'react'

type UseInfiniteScrollProps<T extends Element> = {
  target: React.RefObject<T | null>
  hasMore: boolean
  onIntersect: () => void
}

export const useInfiniteScroll = <T extends Element>({
  target,
  hasMore,
  onIntersect,
}: UseInfiniteScrollProps<T>) => {
  useEffect(() => {
    if (!target.current) return

    const abortController = new AbortController()
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && hasMore) {
        onIntersect()
      }
    })

    observer.observe(target.current)

    return () => {
      abortController.abort()
      observer.disconnect()
    }
  }, [target, hasMore, onIntersect])
}
