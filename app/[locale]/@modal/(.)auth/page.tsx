import { AuthDialog } from './_components/auth-dialog'
import { AuthForm } from './_components/auth-form'

export default function Page() {
  return (
    <AuthDialog>
      <AuthForm featureName="体験日記" />
    </AuthDialog>
  )
}
