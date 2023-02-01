<template>
  <div>
    <n-form ref="formRef" :model="model">
      <n-h1 prefix="bar" align-text>
        <n-text type="primary">
          忘记密码
        </n-text>
      </n-h1>
      <n-form-item path="age" label="账号">
        <n-input v-model:value="model.account"/>
      </n-form-item>
      <n-form-item path="password" label="密码">
        <n-input
            v-model:value="model.password"
            type="password"
        />
      </n-form-item>
      <n-form-item path="password" label="再次输入密码">
        <n-input
            v-model:value="model.password"
            type="password"
            @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item path="password" label="验证码">
        <n-input
            v-model:value="model.password"
            type="password"
            @keydown.enter.prevent
        />
        <n-button style="margin-left: 12px">
          发送短信
        </n-button>
      </n-form-item>
      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div style="display: flex; justify-content: space-between">
            <n-button text @click="toForgetPassword">
              返回登录
            </n-button>
            <n-button attr-type="button" type="primary" @click="submitLogon">
              确认
            </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'

export default defineComponent({
  setup(_, ctx) {
    return {
      model: {
        account: '',
        password: '',
      },
      submitLogon() {
      },
      toForgetPassword() {
        ctx.emit('changePageStatus', 'login')
      }
    }
  }
})
</script>

<style scoped lang="sass" rel="stylesheet/sass">

</style>
