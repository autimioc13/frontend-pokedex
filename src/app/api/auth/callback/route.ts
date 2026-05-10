import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { createServerSupabase } from '@/lib/auth/supabase'

// ============================================================
// GET /api/auth/callback
// Supabase redirige aquí con ?code=XXXX tras el login OAuth.
// Intercambia el code por una sesión activa.
// ============================================================

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerSupabase(cookieStore)

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`)
}
