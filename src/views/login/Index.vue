<template>
  <div id="bg">
    <n-card id="loginForm">
      <v-login @changePageStatus="changePageStatus" v-if="pageStatus === 'login'"></v-login>
      <v-forget-password @changePageStatus="changePageStatus" v-if="pageStatus === 'forgetPassword'"></v-forget-password>
    </n-card>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import VLogin from '@/components/login/Login.vue'
import VForgetPassword from '@/components/login/ForgetPassword.vue'

export default defineComponent({
  components: {
    VLogin,
    VForgetPassword
  },
  setup() {
    const pageStatus = ref('login')
    const changePageStatus = (value: string) => {
      pageStatus.value = value
    }
    return {
      pageStatus,
      changePageStatus
    }
  }
})
</script>

<style scoped lang="sass" rel="stylesheet/sass">
#bg
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: -10
  background-size: cover
  background: url("@/assets/base/background.jpg") no-repeat center center fixed

  #loginForm
    width: 500px
    position: absolute
    top: 50%
    right: 2%
    transform: translate(0, -50%)
    border-radius: 15px
</style>
