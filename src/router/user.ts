import Main from '@/components/common/main.vue'

const User = () => import("@/views/user/Index.vue")
const Analysis = () => import((`@/views/user/Analysis.vue`))
import {
    AccountCircleOutlined as UserIcon,
} from '@vicons/material'

export default [
    {
        path: '/',
        name: '_user',
        redirect: '/user',
        component: Main,
        meta: {
            title: '用户管理',
            icon: UserIcon
        },
        children: [
            {
                path: '/user',
                name: 'user',
                component: User,
                meta: {
                    title: '用户列表',
                }
            },
            {
                path: '/analysis',
                name: 'analysis',
                component: Analysis,
                meta: {
                    title: '用户分析',
                }
            }
        ]
    }
]
