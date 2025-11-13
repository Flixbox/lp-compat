export {}

declare global {
  interface Window {
    theme: {
      getTheme: () => 'light' | 'dark'
      setTheme: (theme: 'light' | 'dark') => void
      getSystemTheme: () => 'light' | 'dark'
    }
  }
}
