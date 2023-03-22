import Main from '@/components/common/main.vue'

const UserPermission = () => import("@/views/permission/Index.vue")
const UserRole = () => import("@/views/permission/Role.vue")

import {
    BuildCircleOutlined as SystemIcon,
} from '@vicons/material'

export default [
    {
        path: '/',
        name: '_permission',
        redirect: '/userPermission',
        component: Main,
        meta: {
            title: '权限管理',
            icon: SystemIcon
        },
        children: [
            {
                path: '/userPermission',
                name: 'userPermission',
                component: UserPermission,
                meta: {
                    title: '用户权限配置',
                },
            },
            {
                path: '/userRole',
                name: 'userRole',
                component: UserRole,
                meta: {
                    title: '用户角色配置',
                }
            },
            {
                path: '/staffPermission',
                name: 'staffPermission',
                component: UserPermission,
                meta: {
                    title: '员工权限配置',
                },
            },
            {
                path: '/staffRole',
                name: 'staffRole',
                component: UserRole,
                meta: {
                    title: '员工角色配置',
                }
            }
        ]
    }
]
