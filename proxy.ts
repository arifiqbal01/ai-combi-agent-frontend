import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export default clerkMiddleware(async (auth, req) => {  // ← async
  const { userId } = await auth()                       // ← await
  const { pathname } = req.nextUrl

  const isPublicRoute = [
    '/login',
    '/sign-up',
    '/sso-callback',
    '/invite',
  ].some((route) => pathname.startsWith(route))

  if (!userId && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (userId && (pathname.startsWith('/login') || pathname.startsWith('/sign-up'))) {
    return NextResponse.redirect(new URL('/inbox', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)',],
}