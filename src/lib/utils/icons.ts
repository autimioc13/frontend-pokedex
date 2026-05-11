// ── UI General ──────────────────────────────────────────────
export {
  Loader2,
  Check,
  X,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Search,
  Filter,
  SlidersHorizontal,
  MoreHorizontal,
  MoreVertical,
  Menu,
  Moon,
  Sun,
  Monitor,
} from 'lucide-react'

// ── Auth ────────────────────────────────────────────────────
export { Eye, EyeOff, Lock, Mail, User, LogIn, LogOut, Zap } from 'lucide-react'

// ── Feedback / Estado ────────────────────────────────────────
export {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  CheckCircle2,
  Info,
  Loader2 as Spinner,
} from 'lucide-react'

// ── Pokémon / Pokédex ────────────────────────────────────────
export {
  Star,
  StarOff,
  Heart,
  BookOpen,
  Swords,
  Shield,
  Zap as Bolt,
  Flame,
  Droplets,
  Leaf,
  Wind,
  Snowflake,
  Bug,
  Mountain,
  Skull,
  Gem,
  Sparkles,
  Dumbbell,
  Atom,
  Layers,
} from 'lucide-react'

// ── Equipo / Battle ──────────────────────────────────────────
export {
  Users,
  UserPlus,
  UserMinus,
  Trophy,
  Target,
  Sword,
  Zap as ZapIcon,
  Activity,
  BarChart2,
  TrendingUp,
} from 'lucide-react'

// ── Scanner / Cámara ─────────────────────────────────────────
export {
  Camera,
  CameraOff,
  ScanLine,
  ImagePlus,
  ZoomIn,
  ZoomOut,
  Crosshair,
} from 'lucide-react'

// ── 3D / Visor ───────────────────────────────────────────────
export {
  RotateCcw,
  RotateCw,
  Maximize2,
  Minimize2,
  RefreshCw,
} from 'lucide-react'

// ── Navegación / PWA ─────────────────────────────────────────
export {
  Home,
  Map,
  Compass,
  Download,
  Share2,
  Bell,
  BellOff,
  Wifi,
  WifiOff,
  Volume2,
  VolumeX,
} from 'lucide-react'

// ── Tipos ────────────────────────────────────────────────────
export type { LucideIcon } from 'lucide-react'

/**
 * GUÍA DE USO — Sistema de iconografía Pokédex OS
 *
 * Librería: Lucide React (lucide-react)
 * Documentación: https://lucide.dev/icons
 *
 * SIEMPRE importar desde este archivo, nunca directamente
 * de lucide-react:
 *   ✅ import { Search } from '@/lib/utils/icons'
 *   ❌ import { Search } from 'lucide-react'
 *
 * SIEMPRE usar el componente <Icon> para consistencia:
 *   ✅ <Icon icon={Search} size="md" />
 *   ❌ <Search className="h-4 w-4" />
 *   (excepción: componentes UI internos como Button e Input)
 *
 * strokeWidth estándar del proyecto: 1.5 (maneja el componente Icon)
 *
 * Para agregar un ícono nuevo:
 *   1. Buscar en https://lucide.dev/icons
 *   2. Agregarlo en la categoría correcta de este archivo
 *   3. Nunca importar de lucide-react directamente en componentes
 */
