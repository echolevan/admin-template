import Main from '@/components/common/main.vue'

const SysIndex = () => import("@/views/system/Index.vue")
const SysPage = () => import((`@/views/system/Page.vue`))

import {
    BuildCircleOutlined as SystemIcon,
} from '@vicons/material'

export default [
    {
        path: '/',
        name: '_system',
        redirect: '/system',
        component: Main,
        meta: {
            title: '系统管理',
            icon: SystemIcon
        },
        children: [
            {
                path: '/system',
                name: 'system',
                component: SysIndex,
                meta: {
                    title: '系统设置',
                }
            },
            {
                path: '/system/page',
                name: 'systemPage',
                component: SysPage,
                meta: {
                    title: '页面管理',
                }
            }
        ]
    }
]
