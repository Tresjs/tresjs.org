export default defineAppConfig({
  ui: {
    colors: {
      primary: 'teal',
      accent: 'yellow',
      neutral: 'zinc'
    },
    card: {
      slots: {
        root: 'hover:bg-linear-[115deg,#272727 .06%,#171717]',
        body: 'p-2 sm:p-3'
      }
    },
    prose: {
      pre: {
        slots: {
          base: 'group font-mono text-sm/6 border border-muted rounded-md px-4 py-3 whitespace-pre-wrap break-words overflow-x-auto focus:outline-none'
        }
      },
      codeTree: {
        slots: {
          root: 'bg-default m-0',
          content: '[&>div>pre]:rounded-r-none'
        }
      }
    },
    changelogVersions: {
      slots: {
        container: 'flex flex-col gap-y-32 sm:gap-y-12 lg:gap-y-16'
      }
    },
    changelogVersion: {
      slots: {
        date: 'font-mono text-xs text-toned truncate',
      }
    },
  },
  content: {
    markdown: {
      highlight: {
        theme: {
          default: 'catppuccin-latte',
          light: 'catppuccin-latte',
          dark: 'catppuccin-frappe',
        },
      },
    },
  },
  site: {
    name: 'TresJS | The solution for 3D with Vue',
    url: 'https://tresjs.org',
  }
})