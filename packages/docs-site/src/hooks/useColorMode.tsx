import { useEffect, useState } from 'react'

type AvailableColorModes = 'light' | 'dark'

function useColorMode(): AvailableColorModes {
  // Default to 'dark' (or 'light') to match your site default prevents hydration mismatch
  const [theme, setTheme] = useState<AvailableColorModes>('dark')

  useEffect(() => {
    // Helper to parse the current Starlight theme state
    const getStarlightTheme = (): AvailableColorModes => {
      // Starlight sets data-theme="dark" or "light" on the <html> tag
      const currentTheme = document.documentElement.getAttribute('data-theme')

      // If explicitly set, return it
      if (currentTheme === 'light' || currentTheme === 'dark') {
        return currentTheme
      }

      // Fallback: Check system preference if Starlight hasn't set the attribute yet
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
      return 'light'
    }

    // 1. Set initial value on mount
    setTheme(getStarlightTheme())

    // 2. Create an observer to watch for changes to the <html> tag
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-theme'
        ) {
          setTheme(getStarlightTheme())
        }
      })
    })

    // 3. Start observing the document root
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    // Cleanup
    return () => observer.disconnect()
  }, [])

  return theme
}

export { useColorMode }
