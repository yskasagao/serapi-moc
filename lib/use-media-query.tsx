import { useEffect, useState } from 'react'

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // SSRの場合はデフォルト値を返す
    if (typeof window === 'undefined') return

    const media = window.matchMedia(query)
    const updateMatches = () => {
      setMatches(media.matches)
    }

    // 初期値を設定
    updateMatches()

    // リスナーを追加
    if (media.addEventListener) {
      media.addEventListener('change', updateMatches)
      return () => media.removeEventListener('change', updateMatches)
    } else {
      // 古いブラウザ向け
      media.addListener(updateMatches)
      return () => media.removeListener(updateMatches)
    }
  }, [query])

  return matches
}
