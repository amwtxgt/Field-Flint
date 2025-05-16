// 为 Electron 的预加载 API 定义全局接口
interface ElectronAPI {
  setTheme: (theme: string) => void;
  getTheme: () => Promise<string>;
  // 添加其他 Electron API 方法
}

interface Window {
  electronAPI: ElectronAPI;
}
