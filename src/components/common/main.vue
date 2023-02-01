<template>
  <n-watermark
      :content="watermarkContent"
      cross
      fullscreen
      :font-size="16"
      :line-height="16"
      :width="384"
      :height="384"
      :x-offset="12"
      :y-offset="60"
      :rotate="-15"
  />
  <n-back-top :right="100" />
  <n-space vertical align="center">
    <n-layout position="absolute" :native-scrollbar="false">
      <n-layout-header bordered style="height: 48px">
        <v-title-main/>
      </n-layout-header>
      <n-layout has-sider position="absolute" style="top: 48px">
        <n-layout-sider
            bordered
            collapse-mode="width"
            :collapsed-width="64"
            :width="240"
            :collapsed="collapsed"
            show-trigger
            @collapse="collapsed = true"
            @expand="collapsed = false"
            :native-scrollbar="false"
        >
          <n-menu
              v-model:value="activeKey"
              :collapsed="collapsed"
              :collapsed-width="64"
              :collapsed-icon-size="22"
              :options="menuOptions"
          />
        </n-layout-sider>
        <n-layout>
          <v-tab-line/>
          <router-view id="content-main"></router-view>
        </n-layout>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script lang="ts">
import {defineComponent, h, ref} from 'vue'
import type {Component} from 'vue'
import {NIcon, useMessage, useLoadingBar} from 'naive-ui'
import VTitleMain from '@/components/common/TitleMain.vue'
import VTabLine from '@/components/common/TabLine.vue'
import {useRouter, RouterLink} from "vue-router"

function renderIcon(icon: Component) {
  return () => h(NIcon, null, {default: () => h(icon)})
}

const doMenu = (needPushMenu: any, router: any, type: string): object => {
  if (type === 'master') {
    needPushMenu = {
      label: (router.children || []).length > 1 ? router.meta.title : () =>
          h(
              RouterLink,
              {
                to: {
                  name: router.name
                }
              },
              {default: () => router.meta.title}
          ),
      key: router.name,
      icon: renderIcon(router.meta.icon),
      children: (router.children || []).length > 1 ? [] : ''
    }
  } else {
    needPushMenu.push({
      label: (router.children || []).length > 1 ? router.meta.title : () =>
          h(
              RouterLink,
              {
                to: {
                  name: router.name
                }
              },
              {default: () => router.meta.title}
          ),
      key: router.name,
      children: (router.children || []) > 1 ? [] : ''
    })
  }
  if ((router.children || []).length > 1) {
    for (let rou of router.children) {
      doMenu(needPushMenu.children || [], rou, 'children')
    }
  }
  return needPushMenu
}

export default defineComponent({
  components: {
    VTitleMain,
    VTabLine
  },
  setup() {
    // @ts-ignore
    window.$Message = useMessage()
    const router = useRouter()
    let allRoutes = router.options.routes

    // @ts-ignore
    window.$LoadingBar = useLoadingBar()

    const menuOptions: object[] = []
    for (let rou of allRoutes) {
      let needPushMenu = {}
      if (rou.children) {
        menuOptions.push(doMenu(needPushMenu, rou, 'master'))
      }
    }

    const watermarkContent = ref('')
    let userInfo: any = localStorage.getItem('userInfo')
    userInfo = JSON.parse(userInfo)
    if (! userInfo) {
      router.push({name: '_login'})
    } else {
      watermarkContent.value = userInfo.mobile || ''
    }

    return {
      activeKey: ref<string | null>(null),
      collapsed: ref(false),
      menuOptions,
      watermarkContent
    }
  }
})
</script>

<style scoped lang="sass" rel="stylesheet/sass">
#content-main
  padding: 15px
</style>
