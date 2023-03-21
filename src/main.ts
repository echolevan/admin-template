import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './sass/index.sass'
import 'vfonts/FiraCode.css'

import {
    create,
    NButton,
    NConfigProvider,
    NCard,
    NSpace,
    NLayout,
    NLayoutSider,
    NLayoutHeader,
    NMenu,
    NImage,
    NAvatar,
    NIcon,
    NDropdown,
    NMessageProvider,
    NScrollbar,
    NSwitch,
    NTag,
    NDrawer,
    NDrawerContent,
    NForm,
    NFormItem,
    NInput,
    NRow,
    NCol,
    NText,
    NH1,
    NWatermark,
    NBackTop,
    NLoadingBarProvider,
    NDataTable,
    NGrid,
    NGi,
    NStatistic
} from 'naive-ui'

const naive = create({
    components: [
        NButton,
        NConfigProvider,
        NCard,
        NSpace,
        NLayout,
        NLayoutSider,
        NLayoutHeader,
        NMenu,
        NImage,
        NAvatar,
        NIcon,
        NDropdown,
        NMessageProvider,
        NScrollbar,
        NSwitch,
        NTag,
        NDrawer,
        NDrawerContent,
        NForm,
        NFormItem,
        NInput,
        NRow,
        NCol,
        NText,
        NH1,
        NWatermark,
        NBackTop,
        NLoadingBarProvider,
        NDataTable,
        NGrid,
        NGi,
        NStatistic
    ]
})

const app = createApp(App)

app.use(naive)
    .use(createPinia())
    .use(router)
    .mount('#app')
