export interface ElectronAPI {
  setTheme: (theme: string) => void
  getTheme: () => Promise<string>
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
  const electronAPI: ElectronAPI
} 