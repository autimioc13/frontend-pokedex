'use client'

import { motion } from 'framer-motion'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      {/* Panel izquierdo — decorativo, solo desktop */}
      <div className="relative hidden flex-col justify-between bg-zinc-100 p-12 md:flex dark:bg-zinc-950">
        {/* Patrón geométrico sutil de fondo */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="h-1.5 w-1.5 rounded-full bg-violet-500" />
          <span className="font-mono text-xs tracking-[0.35em] text-zinc-800 dark:text-zinc-200">
            POKÉDEX OS
          </span>
        </div>

        {/* Tagline inferior */}
        <div className="relative z-10 space-y-4">
          <p className="max-w-\[260px\] text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            Tu Pokédex de nueva generación. Explora, colecciona y compite con
            entrenadores de todo el mundo.
          </p>
          <p className="font-mono text-[10px] tracking-widest text-zinc-400 dark:text-zinc-700">
            v0.1.0-alpha
          </p>
        </div>
      </div>

      {/* Panel derecho — formulario con fadeIn */}
      <div className="flex min-h-screen items-center justify-center bg-white px-6 py-12 dark:bg-black">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full max-w-sm"
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
