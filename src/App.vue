<template>
  <n-config-provider :theme="themeStore.theme === 'darkTheme' ? darkTheme : null" :date-locale="dateZhCN"
                     :locale="zhCN">
    <n-loading-bar-provider>
      <n-message-provider>
        <router-view></router-view>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {darkTheme, dateZhCN, zhCN} from 'naive-ui'
import {useThemeStore} from '@/stores/base'

export default defineComponent({
  setup() {
    const themeStore = useThemeStore()
    return {
      darkTheme,
      dateZhCN,
      zhCN,
      themeStore
    }
  }
})
</script>

<style scoped lang="sass">
</style>
