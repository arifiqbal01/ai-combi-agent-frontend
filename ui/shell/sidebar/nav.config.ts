import {
  Inbox,
  Plug,
  Users,
  BookOpen,
  Bot,
} from 'lucide-react'

export const NAV_SECTIONS = [
  {
    items: [
      {
        href: '/inbox',
        label: 'Inbox',
        icon: Inbox,
      },
      {
        href: '/ai',
        label: 'AI Assistant',
        icon: Bot,
      },
      {
        href: '/knowledge',
        label: 'Knowledge',
        icon: BookOpen,
      },
      {
        href: '/channels',
        label: 'Channels',
        icon: Plug,
      },
      {
        href: '/users',
        label: 'Users',
        icon: Users,
      },
    ],
  },
]

export const NAV_FOOTER = []