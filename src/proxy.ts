import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('session')?.value;

  console.log(sessionToken);

  // Redirect authenticated users away from sign-in
  if (pathname.startsWith('/sign-in')) {
    if (sessionToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Protect dashboard routes — optimistic check (cookie exists)
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/student') ||
    pathname.startsWith('/teacher') ||
    pathname === '/'
  ) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static & _next/image
     * - manifest files (manifest.json, manifest.webmanifest)
     * - static icons (favicon.ico, and any png starting with 'icon-')
     */
    '/((?!api|_next/static|_next/image|favicon.ico|manifest\\.(?:json|webmanifest)$|icon-.*\\.png$).*)',
  ],
};
