'use client'

import { Modal } from '@/components/ui/modal'

type Props = {
  children?: React.ReactNode
}

export const PrivacyDialog = ({ children }: Props) => {
  return (
    <Modal title="プライバシーポリシー" size="large">
      {children}
    </Modal>
  )
}
