import {createRouter, createWebHistory} from 'vue-router'
import home from './home.js'
import user from './user.js'
import permission from './permission.js'
import system from './system.js'
import {useRouterLinkHistoryStore} from '@/stores/tabLine'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...home,
        ...user,
        ...permission,
        ...system
    ]
})

router.beforeEach((to, from, next) => {
    if (to.name !== '_login') {
        const routerLinkHistoryStore = useRouterLinkHistoryStore()
        routerLinkHistoryStore.addHistory({
            name: to.meta.title,
            router: to.name,
        })
    }
    next()
})

router.afterEach((to, from, next) => {
})

export default router
