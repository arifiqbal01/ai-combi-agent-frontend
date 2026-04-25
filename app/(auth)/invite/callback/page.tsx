import { Suspense } from 'react'
import InviteCallbackClient from './InviteCallbackClient'

export default function Page() {
  return (
    <Suspense fallback={null}>
      <InviteCallbackClient />
    </Suspense>
  )
}