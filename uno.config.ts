// uno.config.ts
import { defineConfig,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
  presetAttributify,
  presetTypography
} from 'unocss'

export default defineConfig({
  // ...UnoCSS options
  theme: {
    colors: {
      primary: {
        '50': '#f2fbf8',
        '100': '#d3f4ea',
        '200': '#a6e9d6',
        '300': '#82dbc5',
        '400': '#44bda2',
        '500': '#2ba189',
        '600': '#20816f',
        '700': '#1d685b',
        '800': '#1c534b',
        '900': '#1b463f',
        '950': '#0a2925',
      },
      secondary: {
        '50': '#fff8eb',
        '100': '#feeac7',
        '200': '#fdd48a',
        '300': '#fbb03b',
        '400': '#fa9e25',
        '500': '#f47a0c',
        '600': '#d85607',
        '700': '#b3390a',
        '800': '#922b0e',
        '900': '#78250f',
        '950': '#451003',
      },
      accent: '#00f',
    },
  },
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
        // ...
      },
    }),
    presetTypography({
      cssExtend: {
        'hr': {
          'height': '1px',
          'border': 'none',
          'background': 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0))',
        },
        ':not(pre)>code': {
          padding: '0.25rem 0.5rem !important',
          'font-size': '0.865rem !important',
        },
        'code::after': {
          content: 'none',
        },
        'code::before': {
          content: 'none',
        },
        a: {
          color: '#82DBC5',
          'text-decoration': 'none',
          transition: 'color 400ms ease-in-out',
        },
        'a:hover': {
          color: '#82DBC5',
          'text-decoration': 'underline',
          transition: 'color 400ms ease-in-out',
        },
      }
    }),
  ],
  shortcuts: [
    {
      'btn': 'inline-block px-4 py-2 rounded-lg shadow bg-primary text-white',
      'btn-primary': 'inline-flex items-center px-4 py-2 rounded-lg shadow bg-primary-300 text-white hover:bg-primary-400 hover:text-white transition-colors duration-300 ease-in-out important-decoration-none',
      'btn-secondary': 'inline-flex items-center px-4 py-2 rounded-lg shadow bg-secondary-300 text-white hover:bg-secondary-400 hover:text-white transition-colors duration-300 ease-in-out important-decoration-none',
    },
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup()
  ],
  rules: [
    [ 'shadow-white-blur', {
      'box-shadow': '0 4px 39px 74px rgba(255, 255, 255, 1)',
    }],

    [ 'shadow-dark-blur', {
      'box-shadow': '0 4px 39px 74px rgba(34, 34, 34, 1)',
    }],
  ],
})