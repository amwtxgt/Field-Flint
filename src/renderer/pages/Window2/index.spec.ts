import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Window2 from './index.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// 模拟 vue-i18n
vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key // 简单地返回键名作为翻译
  })
}))

// 模拟 Electron API
Object.defineProperty(window, 'electronAPI', {
  value: {
    setTheme: vi.fn(),
    getTheme: vi.fn().mockResolvedValue('light')
  },
  writable: true
})

describe('Window2 Component', () => {
  const vuetify = createVuetify({
    components,
    directives
  })

  it('renders properly', async () => {
    const wrapper = mount(Window2, {
      global: {
        plugins: [vuetify]
      }
    })
    
    // 等待异步操作完成
    await wrapper.vm.$nextTick()
    
    // 测试组件渲染
    expect(wrapper.text()).toContain('窗口2')
    expect(wrapper.text()).toContain('hello')
    
    // 测试主题切换按钮
    const themeButton = wrapper.find('button')
    await themeButton.trigger('click')
    expect(window.electronAPI.setTheme).toHaveBeenCalled()
  })
})
