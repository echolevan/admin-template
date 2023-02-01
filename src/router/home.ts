import Main from '@/components/common/main.vue'
import Login from '@/views/login/Index.vue'
const Home = () => import("@/views/home/Index.vue")
import {
    CottageOutlined as HomeIcon,
} from '@vicons/material'

export default [
    {
        path: '/',
        name: '_home',
        redirect: '/home',
        component: Main,
        meta: {
            title: '主页',
            icon: HomeIcon
        },
        children: [
            {
                path: '/home',
                name: 'home',
                component: Home,
                meta: {
                    title: '主页',
                }
            }
        ]
    },
    {
        path: '/login',
        name: '_login',
        component: Login,
    }

]
