import { type NextRequest } from 'next/server'

import { updateSession } from '@/lib/auth/middleware'

// ============================================================
// Middleware de Next.js — corre en cada request antes del render
// Delega la lógica de auth a updateSession para mantenerlo limpio
// ============================================================

export async function middleware(request: NextRequest) {
  return updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons|models|sounds|manifest.json).*)',
  ],
}
