import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('themeId', () => {
  const theme = ref('darkTheme')
  function changeTheme(value: string) {
    theme.value = value
  }
  return { theme, changeTheme }
})
