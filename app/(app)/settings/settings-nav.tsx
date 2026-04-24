'use client'

import {
  Palette,
  Bell,
  Sparkles,
  Plug,
  Shield,
  Settings as SettingsIcon,
  Zap,
  BookOpen,
} from 'lucide-react'
import clsx from 'clsx'

const SECTIONS = [
  { id: 'general', label: 'General', icon: SettingsIcon },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },

  { id: 'ai', label: 'AI & Automation', icon: Sparkles },
  { id: 'knowledge', label: 'Knowledge', icon: BookOpen },

  { id: 'channels', label: 'Channels', icon: Plug },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'advanced', label: 'Advanced', icon: Zap },
]

type Props = {
  active: string
  onChange: (id: string) => void
}

export default function SettingsNav({ active, onChange }: Props) {
  return (
    <nav className="flex h-full flex-col gap-1 p-3">
      {SECTIONS.map(section => {
        const Icon = section.icon
        const isActive = active === section.id

        return (
          <button
            key={section.id}
            onClick={() => onChange(section.id)}
            className={clsx(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-bg-muted text-text-primary'
                : 'text-text-secondary hover:bg-bg-muted hover:text-text-primary'
            )}
          >
            <Icon size={16} />
            <span>{section.label}</span>
          </button>
        )
      })}
    </nav>
  )
}