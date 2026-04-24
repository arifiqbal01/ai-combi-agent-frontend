import { Inbox, Settings, Plug, Users } from 'lucide-react'

export const NAV_SECTIONS = [
  {
    items: [
      {
        href: '/inbox',
        label: 'Inbox',
        icon: Inbox,
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
      {
        href: '/settings',
        label: 'Settings',
        icon: Settings,
      },
    ],
  },
]

export const NAV_FOOTER = []