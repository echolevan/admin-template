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
        redirect: '/permission',
        component: Main,
        meta: {
            title: '权限管理',
            icon: SystemIcon
        },
        children: [
            {
                path: '/permission/user',
                name: 'userPermission',
                component: UserPermission,
                meta: {
                    title: '用户权限配置',
                },
            },
            {
                path: '/permission/role',
                name: 'userRole',
                component: UserRole,
                meta: {
                    title: '用户角色配置',
                }
            },
            {
                path: '/permission/staff',
                name: 'staffPermission',
                component: UserPermission,
                meta: {
                    title: '员工权限配置',
                },
            },
            {
                path: '/role/staff',
                name: 'staffRole',
                component: UserRole,
                meta: {
                    title: '员工角色配置',
                }
            }
        ]
    }
]
