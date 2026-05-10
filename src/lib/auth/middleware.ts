import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

// ============================================================
// updateSession — refresca el token de Supabase en cada request
// y protege las rutas según el estado de la sesión.
// ============================================================

const PUBLIC_ROUTES = [
  '/login',
  '/register',
  '/forgot-password',
  '/api/auth/callback',
  '/terms',
  '/privacy',
]

function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  )
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Propagar cookies al request y a la response para que el
          // cliente browser las lea correctamente después del refresh
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // getUser refresca el access token si está expirado
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Autenticado intentando acceder a login/register → redirigir al home
  if (user && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // No autenticado intentando acceder a ruta protegida → redirigir al login
  if (!user && !isPublicRoute(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}
