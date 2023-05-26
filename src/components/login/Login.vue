<template>
  <div>
    <n-form ref="formRef" :model="model">
      <n-h1 prefix="bar" align-text>
        <n-text type="primary">
          登录
        </n-text>
      </n-h1>
      <n-form-item path="age" label="账号">
        <n-input v-model:value="model.user"/>
      </n-form-item>
      <n-form-item path="password" label="密码">
        <n-input
            v-model:value="model.password"
            type="password"
        />
      </n-form-item>
      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div style="display: flex; justify-content: space-between">
            <n-button text @click="toForgetPassword">
              忘记密码？
            </n-button>
            <n-button attr-type="button" type="primary" @click="submitLogon" :loading="loading">
              登录
            </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import {apiLogin, apiUserInfo} from '@/api/login'
import {useRouter} from "vue-router"
import {useMessage} from "naive-ui";

export default defineComponent({
  setup(_, ctx) {
    const model = ref<any>({
      user: 'admin',
      password: '123456',
    })
    const router = useRouter()
    const _message = useMessage()
    // @ts-ignore
    window.$Message = useMessage()

    const loading = ref(false)
    const submitLogon = () => {
      loading.value = true
      apiLogin(model.value.user, model.value.password).then((data) => {
        _message.success(data.message)
        localStorage.setItem('userToken', data.token)
        // 获取用户信息
        apiUserInfo().then(({data})=> {
          localStorage.setItem('userInfo', JSON.stringify(data))
          router.push({name: '_home'})
        })
        loading.value = false
      }).catch((err)=> {
        loading.value = false
        console.log(err);
      })
    }
    return {
      model,
      loading,
      submitLogon,
      toForgetPassword() {
        ctx.emit('changePageStatus', 'forgetPassword')
      }
    }
  }
})
</script>

<style scoped lang="sass" rel="stylesheet/sass">

</style>
