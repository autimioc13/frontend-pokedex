'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, type Variants } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Zap } from 'lucide-react'
import { z } from 'zod'

import { getAuthErrorMessage } from '@/lib/auth/errors'
import { supabase } from '@/lib/auth/supabase'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/ui/form-error'
import { Input } from '@/components/ui/input'

// ============================================================
// PDX-52 — Pantalla Login
// PDX-53 — OAuth Google + GitHub con Supabase Auth
// PDX-54 — Validación en tiempo real, isValid, FormError
// ============================================================

// ── Schema de validación ─────────────────────────────────────

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Ingresá un email válido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(8, 'Mínimo 8 caracteres'),
})

type LoginFormValues = z.infer<typeof loginSchema>

// ── Animaciones ──────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

// ── Componente principal ─────────────────────────────────────

export default function LoginPage() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)
  const [oauthLoading, setOAuthLoading] = useState<'google' | 'github' | null>(
    null,
  )
  const [touched, setTouched] = useState({ email: false, password: false })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const emailValue = watch('email') ?? ''
  const passwordValue = watch('password') ?? ''

  // Detectar error de callback OAuth en la URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('error') === 'auth') {
      setServerError(
        'Hubo un problema al iniciar sesión con el proveedor. Intentá de nuevo.',
      )
    }
  }, [])

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })
      if (error) throw error
      router.push('/')
    } catch (err) {
      setServerError(getAuthErrorMessage(err))
    }
  }

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    setOAuthLoading(provider)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
        },
      })
      if (error) throw error
    } catch (err) {
      setServerError(getAuthErrorMessage(err))
      setOAuthLoading(null)
    }
  }

  return (
    <motion.div
      className="flex flex-col gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Encabezado ────────────────────────────────────── */}
      <motion.div className="flex flex-col gap-2" variants={itemVariants}>
        {/* Logo mobile — solo visible en pantallas pequeñas */}
        <div className="mb-2 flex items-center gap-2 lg:hidden">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-500/20 ring-1 ring-violet-500/30">
            <Zap className="h-3.5 w-3.5 text-violet-400" />
          </div>
          <span className="font-mono text-xs font-medium tracking-widest text-zinc-500">
            POKÉDEX OS
          </span>
        </div>

        <h1 className="font-sans text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Bienvenido de vuelta
        </h1>
        <p className="font-sans text-sm text-zinc-500 dark:text-zinc-400">
          Ingresa a tu cuenta de entrenador
        </p>
      </motion.div>

      {/* ── Botones OAuth ─────────────────────────────────── */}
      <motion.div className="flex flex-col gap-2.5" variants={itemVariants}>
        {/* Google */}
        <Button
          type="button"
          variant="outline"
          fullWidth
          loading={oauthLoading === 'google'}
          disabled={oauthLoading !== null || isSubmitting}
          onClick={() => handleOAuthLogin('google')}
          aria-label="Continuar con Google"
        >
          <GoogleIcon />
          {oauthLoading === 'google' ? 'Conectando...' : 'Continuar con Google'}
        </Button>

        {/* GitHub */}
        <Button
          type="button"
          variant="outline"
          fullWidth
          loading={oauthLoading === 'github'}
          disabled={oauthLoading !== null || isSubmitting}
          onClick={() => handleOAuthLogin('github')}
          aria-label="Continuar con GitHub"
        >
          <GithubIcon />
          {oauthLoading === 'github' ? 'Conectando...' : 'Continuar con GitHub'}
        </Button>
      </motion.div>

      {/* ── Divisor ───────────────────────────────────────── */}
      <motion.div
        className="flex items-center gap-3"
        variants={itemVariants}
        aria-hidden="true"
      >
        <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
        <span className="font-sans text-xs text-zinc-400 dark:text-zinc-600">
          o con email
        </span>
        <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
      </motion.div>

      {/* ── Formulario ────────────────────────────────────── */}
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        variants={itemVariants}
        noValidate
      >
        {/* Error del servidor */}
        <FormError message={serverError} />

        {/* Email */}
        <Input
          label="Email"
          type="email"
          placeholder="entrenador@pokedex.os"
          autoComplete="email"
          autoFocus
          error={errors.email?.message}
          showError={touched.email}
          isValid={touched.email && !errors.email && !!emailValue}
          {...register('email')}
          onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
        />

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            error={errors.password?.message}
            showError={touched.password}
            isValid={touched.password && !errors.password && !!passwordValue}
            {...register('password')}
            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
          />

          {/* Olvidé mi contraseña */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="font-sans text-xs text-zinc-500 underline-offset-2 transition-colors duration-150 hover:text-violet-500 hover:underline dark:text-zinc-500 dark:hover:text-violet-400"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>

        {/* Submit */}
        <Button type="submit" fullWidth loading={isSubmitting} className="mt-1">
          {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </Button>
      </motion.form>

      {/* ── Link a registro ───────────────────────────────── */}
      <motion.p
        className="text-center font-sans text-sm text-zinc-500 dark:text-zinc-400"
        variants={itemVariants}
      >
        ¿No tenés cuenta?{' '}
        <Link
          href="/register"
          className="font-medium text-violet-600 underline-offset-2 transition-colors duration-150 hover:text-violet-500 hover:underline dark:text-violet-400 dark:hover:text-violet-300"
        >
          Crear cuenta
        </Link>
      </motion.p>
    </motion.div>
  )
}

// ── Ícono GitHub (SVG inline) ────────────────────────────────

function GithubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
        className="fill-zinc-900 dark:fill-zinc-100"
      />
    </svg>
  )
}

// ── Ícono Google (SVG inline) ────────────────────────────────

function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}
