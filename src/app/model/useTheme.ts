import { useLayoutEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const savedTheme = window.localStorage.getItem('theme')
      return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'light'
    } catch {
      return 'light'
    }
  })

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      window.localStorage.setItem('theme', theme)
    } catch {
      // Keep the selected theme active when browser storage is unavailable.
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light')
  }

  return { theme, toggleTheme }
}
