// ============================================================
// Mapa de códigos de error de Supabase Auth → mensajes en español
// ============================================================

const SUPABASE_ERROR_MESSAGES: Record<string, string> = {
  // Login
  invalid_credentials: 'Email o contraseña incorrectos. Verificá tus datos.',
  email_not_confirmed:
    'Confirmá tu email antes de iniciar sesión. Revisá tu bandeja de entrada.',
  user_not_found: 'No existe una cuenta con ese email.',
  too_many_requests:
    'Demasiados intentos. Esperá unos minutos antes de intentar de nuevo.',

  // Registro
  user_already_exists: 'Este email ya está registrado. ¿Querés iniciar sesión?',
  email_address_invalid: 'El email ingresado no es válido.',
  password_too_short: 'La contraseña es demasiado corta. Mínimo 8 caracteres.',
  weak_password:
    'La contraseña es muy débil. Usá letras, números y mayúsculas.',

  // OAuth
  provider_email_needs_verification: 'Verificá tu email para continuar.',
  oauth_provider_not_supported:
    'Este proveedor no está disponible por el momento.',

  // Red / servidor
  network_failure: 'Sin conexión a internet. Verificá tu red y reintentá.',
  internal_server_error:
    'Error del servidor. Intentá de nuevo en unos momentos.',
}

const FALLBACK_MESSAGE = 'Ocurrió un error inesperado. Intentá de nuevo.'

export function getAuthErrorMessage(error: unknown): string {
  if (!error) return FALLBACK_MESSAGE

  const err = error as { code?: string; message?: string }
  const code = err.code ?? ''
  const message = (err.message ?? '').toLowerCase()

  if (code && SUPABASE_ERROR_MESSAGES[code]) {
    return SUPABASE_ERROR_MESSAGES[code]
  }

  // Matching por mensaje como fallback (Supabase no siempre incluye code)
  if (
    message.includes('invalid login credentials') ||
    message.includes('invalid_credentials')
  ) {
    return SUPABASE_ERROR_MESSAGES['invalid_credentials']
  }
  if (message.includes('email not confirmed')) {
    return SUPABASE_ERROR_MESSAGES['email_not_confirmed']
  }
  if (message.includes('user not found')) {
    return SUPABASE_ERROR_MESSAGES['user_not_found']
  }
  if (message.includes('too many requests') || message.includes('rate limit')) {
    return SUPABASE_ERROR_MESSAGES['too_many_requests']
  }
  if (message.includes('already registered')) {
    return SUPABASE_ERROR_MESSAGES['user_already_exists']
  }

  return FALLBACK_MESSAGE
}
