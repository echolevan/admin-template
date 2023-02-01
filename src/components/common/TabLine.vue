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
                     :type="route.name === routerLink.router ? 'success' : ''" @click="toRouter(routerLink.router)">
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
import {defineComponent, ref} from 'vue'
import {
  KeyboardArrowLeftRound as Left,
  KeyboardArrowRightRound as Right,
  Brightness1Round as BrightnessChecked,
  Brightness1Outlined as Brightness,
} from '@vicons/material'
import {useRouterLinkHistoryStore} from '@/stores/tabLine'
import {useRoute, useRouter} from "vue-router"

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

    return {
      routerLinkHistoryStore,
      route,
      changeTableLine(type: string) {
        if (type === 'left') {
          this.$refs.scrollbar.scrollBy({left: -30})
        } else {
          this.$refs.scrollbar.scrollBy({left: 30})
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
