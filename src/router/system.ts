import Main from '@/components/common/main.vue'

const User = () => import("@/views/user/Index.vue")
const Analysis = () => import((`@/views/user/Analysis.vue`))

import {
    BuildCircleOutlined as SystemIcon,
} from '@vicons/material'

export default [
    {
        path: '/',
        name: '_user2',
        redirect: '/user1',
        component: Main,
        meta: {
            title: '系统管理',
            icon: SystemIcon
        },
        children: [
            {
                path: '/user1',
                name: 'user1',
                component: Analysis,
                meta: {
                    title: '系统管理01',
                }
            },
            {
                path: '/analysis2',
                name: 'analysis2',
                component: Analysis,
                meta: {
                    title: '系统管理02',
                }
            }
        ]
    }
]
