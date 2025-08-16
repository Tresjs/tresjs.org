export const colors = {
    DARK: '#1e1f22',
    DARK_STROKE: '#2e2e2e',
    LIGHT: '#f8f8f8',
    LIGHT_STROKE: '#e5e7eb',
    DARK_TEXT: '#ffffff',
    LIGHT_TEXT: '#000000',
  }

export const useDarkMode = () => {
  const colorMode = useColorMode()
  const isDark = computed({
    get() {
      return colorMode.value === 'dark'
    },
    set(_isDark) {
      colorMode.preference = _isDark ? 'dark' : 'light'
    }
  })

  return {
    colorMode,
    isDark,
    colors
  }
}