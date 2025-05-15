<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>窗口2</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleTheme">
        asa
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>窗口2内容</v-card-title>
              <v-card-text>
                <p>{{ t('hello') }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const theme = useTheme()
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  window.electronAPI.setTheme(theme.global.name.value)
}

onMounted(async () => {
  const savedTheme = await window.electronAPI.getTheme()
  if (savedTheme) {
    theme.global.name.value = savedTheme
  }
})
</script>
