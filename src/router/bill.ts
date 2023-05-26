import Main from '@/components/common/main.vue'

const User = () => import("@/views/bill/Index.vue")
const Analysis = () => import((`@/views/bill/Analysis.vue`))
import {
    AccountCircleOutlined as UserIcon,
} from '@vicons/material'

export default [
    {
        path: '/',
        name: '_bill',
        redirect: '/bill/recharge',
        component: Main,
        meta: {
            title: '冲提管理',
            icon: UserIcon
        },
        children: [
            {
                path: '/bill/recharge',
                name: 'billRecharge',
                component: User,
                meta: {
                    title: '充值列表',
                }
            },
            {
                path: '/bill/withdrawal',
                name: 'billWithdrawal',
                component: Analysis,
                meta: {
                    title: '提现管理',
                }
            }
        ]
    }
]
