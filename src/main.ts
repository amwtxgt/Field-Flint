import { createApp } from 'vue'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import './styles/main.css'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light'
  }
})

const i18n = createI18n({
  locale: 'zh-CN',
  messages: {
    'zh-CN': {
      hello: '你好'
    }
  }
})

const app = createApp(App)
app.use(vuetify)
app.use(i18n)
app.use(createPinia())
app.mount('#app') 