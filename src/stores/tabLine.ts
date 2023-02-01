import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRouterLinkHistoryStore = defineStore('routerLinkHistory', () => {
  const routerLinkHistory = ref(<any[]>[])
  const routerLinkHistoryTitle = ref(<any[]>[])
  function addHistory(value: any) {
    if (routerLinkHistoryTitle.value.indexOf(value.name) === -1) {
      routerLinkHistory.value.push(value)
      routerLinkHistoryTitle.value.push(value.name)
    }
  }
  return { routerLinkHistory, addHistory }
})
