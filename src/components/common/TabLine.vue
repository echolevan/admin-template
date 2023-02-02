<template>
  <div>
    <n-card style="height: 45px;" id="tabLine" content-style="padding: 0">
      <n-space :wrap="false" align="center" style="height: 45px">
        <n-button size="small" type="tertiary" class="tabLineButton" id="tabLineButtonLeft"
                  @click="changeTableLine('left')">
          <template #icon>
            <n-icon>
              <left/>
            </n-icon>
          </template>
        </n-button>
        <div>
          <n-scrollbar x-scrollable ref="scrollbar">
            <n-space :wrap="false" align="center" justify="start" inline style="height: 45px">
              <n-tag class="hover-hand" v-for="(routerLink, key) in routerLinkHistoryStore.routerLinkHistory" :key="key"
                     :type="route.name === routerLink.router ? 'success' : ''" @click="toRouter(routerLink.router)" @contextmenu="(e) =>handleContextMenu(e, routerLink)">
                {{ routerLink.name }}
                <template #icon>
                  <n-icon>
                    <brightness v-if="route.name !== routerLink.router"/>
                    <brightness-checked v-if="route.name === routerLink.router"/>
                  </n-icon>
                </template>
              </n-tag>
            </n-space>
          </n-scrollbar>
          <n-dropdown
              placement="bottom-start"
              trigger="manual"
              :x="x"
              :y="y"
              :options="dropdownOptions"
              :show="showDropdown"
              :on-clickoutside="clickOutside"
              @select="handleSelect"
          />
        </div>
        <n-button size="small" type="tertiary" class="tabLineButton" id="tabLineButtonRight"
                  @click="changeTableLine('right')">
          <template #icon>
            <n-icon>
              <right/>
            </n-icon>
          </template>
        </n-button>
      </n-space>
    </n-card>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, nextTick} from 'vue'
import {
  KeyboardArrowLeftRound as Left,
  KeyboardArrowRightRound as Right,
  Brightness1Round as BrightnessChecked,
  Brightness1Outlined as Brightness,
} from '@vicons/material'
import {useRouterLinkHistoryStore} from '@/stores/tabLine'
import {useRoute, useRouter} from "vue-router"
import type {ScrollbarInst} from "naive-ui";

export default defineComponent({
  components: {
    Left,
    Right,
    BrightnessChecked,
    Brightness,
  },
  setup() {
    const routerLinkHistoryStore = useRouterLinkHistoryStore()
    const route = useRoute()
    const router = useRouter()
    const dropdownOptions = ref([
      {
        label: '关闭其他标签',
        key: 'closeTab'
      }
    ])
    const showDropdown = ref(false)
    const x = ref(0)
    const y = ref(0)

    const scrollbar= ref<ScrollbarInst | any>()

    const currentRouter = <any>ref({})

    return {
      routerLinkHistoryStore,
      route,
      dropdownOptions,
      showDropdown,
      scrollbar,
      x,
      y,
      handleContextMenu(e: { preventDefault: () => void; clientX: number; clientY: number }, router: any){
        currentRouter.value = router
        e.preventDefault()
        showDropdown.value = true
        nextTick().then(() => {
          showDropdown.value = true
          x.value = e.clientX
          y.value = e.clientY
        })
      },
      clickOutside() {
        showDropdown.value = false
      },
      handleSelect(value: string) {
        switch (value) {
          case 'closeTab':
            routerLinkHistoryStore.delOtherTable(currentRouter.value)
            if (route.name !== currentRouter.value.router) {
              router.push({name: currentRouter.value.router})
            }
            showDropdown.value = false
            break;
          default:
            break;
        }
      },
      changeTableLine(type: string) {
        if (type === 'left') {
          scrollbar.value.scrollBy({left: -30})
        } else {
          scrollbar.value.scrollBy({left: 30})
        }
      },
      toRouter(routerLink: any) {
        router.push({name: routerLink})
      }
    }
  }
})
</script>

<style scoped lang="sass">
#tabLine
  padding: 0 50px 0 30px
  height: 45px
  position: relative

  .tabLineButton
    width: 25px
    position: absolute
    top: 0
    z-index: 99
    height: 100%

    &#tabLineButtonLeft
      left: 0

    &#tabLineButtonRight
      right: 0
</style>
