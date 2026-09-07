import type { PTheme } from '../types'

const THEME_KEY = 'p-theme'

export const useTheme = () => {
  const getTheme = (): PTheme => {
    const savedTheme = localStorage.getItem(THEME_KEY) as PTheme | null

    return savedTheme ?? 'light'
  }

  const setTheme = (theme: PTheme): void => {
    document.documentElement.dataset.theme = theme

    localStorage.setItem(THEME_KEY, theme)
  }

  return {
    getTheme,
    setTheme,
  }
}
