<template>
  <div>
    <div style="height: 48px;">
      <n-space justify="space-between" align="center" id="title-main" style="height: 48px">
        <div style="height: 39px">
          <n-image width="39" height="39" :src="logo" preview-disabled='preview-disabled'/>
        </div>
        <div style="height: 30px">
          <n-icon size="20" id="setting">
            <setting/>
          </n-icon>
          <n-icon size="20" id="setting">
            <setting/>
          </n-icon>
          <n-icon size="20" id="setting">
            <setting/>
          </n-icon>
          <n-icon size="20" id="setting">
            <setting/>
          </n-icon>
          <n-switch :rail-style="railStyle" @update:value="handleUpdateValue" :value="themeStore.theme === 'darkTheme'"
                    style="padding-bottom: 15px;padding-right: 15px">
            <template #checked>
              深色
            </template>
            <template #unchecked>
              浅色
            </template>
          </n-switch>
          <n-dropdown
              placement="bottom-start"
              trigger="click"
              size="small"
              :options="options"
              @select="handleSelect"
          >
            <n-avatar
                round
                :size="30"
                :src="logo"
            />
          </n-dropdown>
        </div>
      </n-space>
    </div>
    <n-drawer v-model:show="active" :width="502" placement="right">
      <n-drawer-content title="用户资料">
        这里可以做用户信息编辑，头像、账号名称、密码重置等
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import type {CSSProperties} from 'vue'
import logo from '@/assets/base/logo.png'
import {
  SettingsRound as Setting,
} from '@vicons/material'
import {useMessage} from "naive-ui";
import {useThemeStore} from '@/stores/base'
import {useRouter} from "vue-router"

const options = [
  {
    label: '用户资料',
    key: 'profile',
  },
  {
    label: '退出登录',
    key: 'logout',
  }
]

export default defineComponent({
  components: {
    Setting,
  },
  setup() {
    const message = useMessage()
    const router = useRouter()
    const themeStore = useThemeStore()
    const active = ref(false)
    const activate = () => {
      active.value = true
    }
    const logout = () => {
      // 清除用户信息
      localStorage.removeItem('userToken')
      localStorage.removeItem('userInfo')
      router.push({name: '_login'})
    }
    return {
      logo,
      options,
      themeStore,
      active,
      handleSelect(key: string | number) {
        switch (key) {
          case 'profile':
            activate()
            break;
          case 'logout':
            logout()
            break;
          default:
            message.info(String(key))
            break;
        }
      },
      railStyle: ({focused, checked}: {
        focused: boolean
        checked: boolean
      }) => {
        const style: CSSProperties = {}
        if (checked) {
          style.background = '#d03050'
          if (focused) {
            style.boxShadow = '0 0 0 2px #d0305040'
          }
        } else {
          style.background = '#2080f0'
          if (focused) {
            style.boxShadow = '0 0 0 2px #2080f040'
          }
        }
        return style
      },
      handleUpdateValue(value: boolean) {
        themeStore.changeTheme(value ? 'darkTheme' : 'brightTheme')
      },
    }
  }
})
</script>

<style scoped lang="sass" rel="stylesheet/sass">
#title-main
  padding: 0 30px

  #setting
    margin-right: 15px
</style>
