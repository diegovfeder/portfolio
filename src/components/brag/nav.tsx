import { A, useLocation } from '@solidjs/router'
import { For } from 'solid-js'

import { bragReports } from '~/data/brag/reports'

interface BragNavLink {
  href: string
  label: string
}

const buildBragNavLinks = (): BragNavLink[] => {
  const yearLinks = [...bragReports]
    .sort((left, right) => Number(right.year) - Number(left.year))
    .map<BragNavLink>((report) => ({
      href: `/brag/${report.year}`,
      label: `${report.year}.`,
    }))

  return [
    { href: '/brag', label: 'brag.' },
    { href: '/brag/profile', label: 'profile.' },
    { href: '/brag/toolkit', label: 'toolkit.' },
    ...yearLinks,
  ]
}

const normalizePath = (path: string) =>
  path.length > 1 ? path.replace(/\/+$/, '') : path

const BragNav = () => {
  const location = useLocation()
  const links = buildBragNavLinks()

  return (
    <nav
      aria-label="brag sub navigation"
      class="flex flex-wrap gap-2 pb-8 border-b border-gray-200 dark:border-gray-800 mb-12"
    >
      <For each={links}>
        {(link) => {
          const isActive = () => normalizePath(location.pathname) === link.href
          return (
            <A
              href={link.href}
              class="font-mono text-sm rounded-full border-2 px-4 py-2 transition-all duration-500 hover:scale-105 focus-ring"
              classList={{
                'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-black dark:border-white':
                  isActive(),
                'border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400':
                  !isActive(),
              }}
            >
              {link.label}
            </A>
          )
        }}
      </For>
    </nav>
  )
}

export default BragNav
