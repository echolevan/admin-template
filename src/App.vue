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

<script lang="ts" setup>
import {darkTheme, dateZhCN, zhCN} from 'naive-ui'
import {useThemeStore} from '@/stores/base'

const themeStore = useThemeStore()
</script>

<style scoped lang="sass">
</style>
