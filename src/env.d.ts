/// <reference types="vite/client" />

interface Window {
  electronAPI: {
    setTheme: (theme: string) => void
    getTheme: () => Promise<string>
    openWindow2: () => void
  }
} 