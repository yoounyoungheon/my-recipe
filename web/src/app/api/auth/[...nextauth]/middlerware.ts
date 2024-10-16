import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match } from 'path-to-regexp'
import { getSession } from './auth.action' // import { auth } from '@/auth'


const matchersForAuth = [
  '/home/*',
  '/add-recipe/*',
]
const matchersForSignIn = [ 
  '/*'
]

export async function middleware(request: NextRequest) {
  // 인증이 필요한 페이지
  if (isMatch(request.nextUrl.pathname, matchersForAuth)) {
    return (await getSession()) // 세션 정보 확인
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/', request.url))
      // : NextResponse.redirect(new URL(`/signin?callbackUrl=${request.url}`, request.url))
  }
  // 로그인 상태에서 접근하면 홈으로 리디렉션
  if (isMatch(request.nextUrl.pathname, matchersForSignIn)) {
    return (await getSession())
      ? NextResponse.redirect(new URL('/home', request.url))
      : NextResponse.next()
  }
  return NextResponse.next()
}

// 경로 일치 확인!
function isMatch(pathname: string, urls: string[]) {
  return urls.some(url => !!match(url)(pathname))
}