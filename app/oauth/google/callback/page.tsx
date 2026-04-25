import { Suspense } from 'react'
import GoogleCallbackClient from './GoogleCallbackClient'

export default function Page() {
  return (
    <Suspense fallback={null}>
      <GoogleCallbackClient />
    </Suspense>
  )
}