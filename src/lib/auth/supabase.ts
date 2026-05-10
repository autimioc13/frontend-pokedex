import { createBrowserClient, createServerClient } from '@supabase/ssr'
import { type ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

// ============================================================
// Cliente Supabase — singleton para browser y factory para server
// Browser: usar en componentes 'use client'
// Server: usar en Route Handlers y Server Components
// ============================================================

// TODO: reemplazar por el tipo generado con: npx supabase gen types
export type Database = Record<string, never>

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// ── Cliente browser (singleton) ──────────────────────────────

export const supabase = createBrowserClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
)

// ── Cliente server (factory) ─────────────────────────────────

export function createServerSupabase(cookieStore: ReadonlyRequestCookies) {
  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          try {
            // cookieStore.set puede lanzar en Server Components de solo lectura
            ;(
              cookieStore as unknown as {
                set: (name: string, value: string, options: object) => void
              }
            ).set(name, value, options)
          } catch {
            // Ignorar — el middleware se encarga de refrescar la sesión
          }
        })
      },
    },
  })
}
