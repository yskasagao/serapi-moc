'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AuthDialog } from '../@modal/(.)auth/_components/auth-dialog'
import { AuthForm } from '../@modal/(.)auth/_components/auth-form'

export default function Page() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(true)

  const handleClose = () => {
    setShowModal(false)
    router.back()
  }

  // 開発時のモーダル確認のため、認証状態に関係なくモーダルを表示

  return (
    <>
      {showModal && (
        <AuthDialog>
          <AuthForm featureName="体験日記" />
        </AuthDialog>
      )}
    </>
  )
}
