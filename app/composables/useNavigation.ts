import { createSharedComposable } from '@vueuse/core'
import type { NavigationMenuItem } from '@nuxt/ui'

function _useHeaderLinks() {
  const route = useRoute()

  const headerLinks = computed<NavigationMenuItem[]>(() => [
    {
      label: 'Blog',
      to: '/blog',
      active: route.path.startsWith('/blog')
    },
    {
      label: 'Docs',
      to: 'https://docs.tresjs.org/',
      target: '_blank'
    },
    {
      label: 'Showcase',
      to: '/showcase',
      active: route.path.startsWith('/showcase')
    },
    {
      label: 'Releases',
      to: 'https://github.com/Tresjs/tres/releases',
      target: '_blank'
    }
  ])

  return {
    headerLinks
  }
}

export const useHeaderLinks = createSharedComposable(_useHeaderLinks)

const _useFooterLinks = () => {
  const footerLinks = computed<NavigationMenuItem[]>(() => [
    {
      label: 'Community',
      children: [
        {
          label: 'Team',
        },
        {
          label: 'Design Kit',
        }
      ]
    }
  ])

  return {
    footerLinks
  }
}

export const useFooterLinks = createSharedComposable(_useFooterLinks)