import { Suspense } from 'react'
import AcceptInviteClient from './AcceptInviteClient'

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AcceptInviteClient />
    </Suspense>
  )
}