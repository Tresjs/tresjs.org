// uno.config.ts
import { defineConfig,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
  presetAttributify
} from 'unocss'

export default defineConfig({
  // ...UnoCSS options
  theme: {
    colors: {
      primary: '#82DBC5',
      secondary: '#FBB03B',
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
  ],
  shortcuts: [
    {
      'btn': 'inline-block px-4 py-2 rounded-lg shadow bg-primary text-white',
    }
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