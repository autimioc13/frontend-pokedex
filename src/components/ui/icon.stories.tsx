import type { Meta, StoryObj } from '@storybook/react'
import {
  Star,
  Heart,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  LogIn,
  LogOut,
  Zap,
  Search,
  Home,
  Menu,
  BookOpen,
  Swords,
  Shield,
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
  Atom,
  Layers,
  Users,
  UserPlus,
  Trophy,
  Target,
  Sword,
  Activity,
  BarChart2,
  TrendingUp,
  Camera,
  CameraOff,
  ScanLine,
  ImagePlus,
  ZoomIn,
  ZoomOut,
  Crosshair,
  RotateCcw,
  RotateCw,
  Maximize2,
  Minimize2,
  RefreshCw,
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
} from '@/lib/utils/icons'
import { Icon } from './icon'

const meta = {
  title: 'UI/Icon',
  component: Icon,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    decorative: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {
  args: {
    icon: Star,
    size: 'md',
  },
}

export const ExtraSmall: Story = {
  args: {
    icon: Star,
    size: 'xs',
  },
}

export const Small: Story = {
  args: {
    icon: Star,
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    icon: Star,
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    icon: Star,
    size: 'lg',
  },
}

export const ExtraLarge: Story = {
  args: {
    icon: Star,
    size: 'xl',
  },
}

export const TwoXLarge: Story = {
  args: {
    icon: Star,
    size: '2xl',
  },
}

export const AllSizes: Story = {
  args: { icon: Star },
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon={Star} size="xs" />
      <Icon icon={Star} size="sm" />
      <Icon icon={Star} size="md" />
      <Icon icon={Star} size="lg" />
      <Icon icon={Star} size="xl" />
      <Icon icon={Star} size="2xl" />
    </div>
  ),
}

export const AccessibilityDemo: Story = {
  args: { icon: Star },
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          Decorative (default)
        </p>
        <Icon icon={Star} size="lg" decorative={true} />
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          Semantic with label
        </p>
        <Icon
          icon={Star}
          size="lg"
          decorative={false}
          label="Mark as favorite"
        />
      </div>
    </div>
  ),
}

export const Catalog: Story = {
  args: { icon: Star },
  render: () => (
    <div className="w-full space-y-6">
      <div>
        <h3 className="mb-3 font-semibold text-zinc-600 dark:text-zinc-400">
          UI General
        </h3>
        <div className="grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8">
          <Icon icon={AlertCircle} size="md" />
          <Icon icon={CheckCircle} size="md" />
          <Icon icon={Eye} size="md" />
          <Icon icon={EyeOff} size="md" />
          <Icon icon={Lock} size="md" />
          <Icon icon={Mail} size="md" />
          <Icon icon={User} size="md" />
          <Icon icon={Search} size="md" />
          <Icon icon={Home} size="md" />
          <Icon icon={Menu} size="md" />
          <Icon icon={Download} size="md" />
        </div>
      </div>
      <div>
        <h3 className="mb-3 font-semibold text-zinc-600 dark:text-zinc-400">
          Auth
        </h3>
        <div className="grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8">
          <Icon icon={LogIn} size="md" />
          <Icon icon={LogOut} size="md" />
          <Icon icon={Zap} size="md" />
          <Icon icon={User} size="md" />
        </div>
      </div>
      <div>
        <h3 className="mb-3 font-semibold text-zinc-600 dark:text-zinc-400">
          Pokémon
        </h3>
        <div className="grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8">
          <Icon icon={Star} size="md" />
          <Icon icon={Heart} size="md" />
          <Icon icon={BookOpen} size="md" />
          <Icon icon={Swords} size="md" />
          <Icon icon={Shield} size="md" />
          <Icon icon={Flame} size="md" />
          <Icon icon={Droplets} size="md" />
          <Icon icon={Leaf} size="md" />
        </div>
      </div>
      <div>
        <h3 className="mb-3 font-semibold text-zinc-600 dark:text-zinc-400">
          Elements
        </h3>
        <div className="grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8">
          <Icon icon={Wind} size="md" />
          <Icon icon={Snowflake} size="md" />
          <Icon icon={Bug} size="md" />
          <Icon icon={Mountain} size="md" />
          <Icon icon={Skull} size="md" />
          <Icon icon={Gem} size="md" />
          <Icon icon={Sparkles} size="md" />
          <Icon icon={Atom} size="md" />
        </div>
      </div>
      <div>
        <h3 className="mb-3 font-semibold text-zinc-600 dark:text-zinc-400">
          Battle
        </h3>
        <div className="grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8">
          <Icon icon={Users} size="md" />
          <Icon icon={UserPlus} size="md" />
          <Icon icon={Trophy} size="md" />
          <Icon icon={Target} size="md" />
          <Icon icon={Sword} size="md" />
          <Icon icon={Activity} size="md" />
          <Icon icon={BarChart2} size="md" />
          <Icon icon={TrendingUp} size="md" />
        </div>
      </div>
      <div>
        <h3 className="mb-3 font-semibold text-zinc-600 dark:text-zinc-400">
          Scanner
        </h3>
        <div className="grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8">
          <Icon icon={Camera} size="md" />
          <Icon icon={CameraOff} size="md" />
          <Icon icon={ScanLine} size="md" />
          <Icon icon={ImagePlus} size="md" />
          <Icon icon={ZoomIn} size="md" />
          <Icon icon={ZoomOut} size="md" />
          <Icon icon={Crosshair} size="md" />
        </div>
      </div>
      <div>
        <h3 className="mb-3 font-semibold text-zinc-600 dark:text-zinc-400">
          3D
        </h3>
        <div className="grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8">
          <Icon icon={RotateCcw} size="md" />
          <Icon icon={RotateCw} size="md" />
          <Icon icon={Maximize2} size="md" />
          <Icon icon={Minimize2} size="md" />
          <Icon icon={RefreshCw} size="md" />
          <Icon icon={Layers} size="md" />
        </div>
      </div>
      <div>
        <h3 className="mb-3 font-semibold text-zinc-600 dark:text-zinc-400">
          Navigation
        </h3>
        <div className="grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8">
          <Icon icon={Home} size="md" />
          <Icon icon={Map} size="md" />
          <Icon icon={Compass} size="md" />
          <Icon icon={Share2} size="md" />
          <Icon icon={Bell} size="md" />
          <Icon icon={BellOff} size="md" />
          <Icon icon={Wifi} size="md" />
          <Icon icon={WifiOff} size="md" />
          <Icon icon={Volume2} size="md" />
          <Icon icon={VolumeX} size="md" />
        </div>
      </div>
    </div>
  ),
}
