'use client'

import { Modal } from '@/components/ui/modal'

type Props = {
  children?: React.ReactNode
}

export const AuthDialog = ({ children }: Props) => {
  return (
    <Modal title="ログイン・新規登録" size="large">
      {children}
    </Modal>
  )
}
