import { useRouter, useSearchParams } from 'next/navigation'

export function useOAuthCallback() {
  const router = useRouter()
  const params = useSearchParams()

  function handle() {
    const error = params.get('error')

    if (error) {
      router.replace('/channels?error=oauth_failed')
      return
    }

    router.replace('/channels?connected=1')
  }

  return { handle }
}