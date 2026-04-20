import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const intlMiddleware = createMiddleware({
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  localePrefix: 'always',
  localeDetection: false,
})

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const locale = pathname.split('/')[1] || 'ar'

  if (pathname.includes('/dashboard')) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}/login`, req.url))
    }

    if (token.role === 'admin') {
      if (
        token.sector === 'sports' &&
        (pathname.includes('/dashboard/health') ||
          pathname.includes('/dashboard/education'))
      ) {
        return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url))
      }

      if (
        token.sector === 'health' &&
        (pathname.includes('/dashboard/sports') ||
          pathname.includes('/dashboard/education'))
      ) {
        return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url))
      }

      if (
        token.sector === 'education' &&
        (pathname.includes('/dashboard/sports') ||
          pathname.includes('/dashboard/health'))
      ) {
        return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url))
      }

      if (pathname.includes('/dashboard/faq')) {
        return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url))
      }
    }

    return NextResponse.next()
  }

  if (pathname.includes('/login')) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (token) {
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url))
    }
  }

  return intlMiddleware(req)
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}