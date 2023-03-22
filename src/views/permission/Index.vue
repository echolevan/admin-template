<template>
  <div>
    <n-grid x-gap="12" :cols="2">
      <n-gi class="permissionCard">
        <n-card hoverable>
          <n-alert title="设置权限" type="info" class="marginBottom-15">
            在这里编辑权限
          </n-alert>
          <n-tree
              block-line
              :data="data"
              :default-expand-all="true"
              :render-suffix="renderSuffix"
          />
          <div class="flex flex-row flex-end">
            <n-button attr-type="button" type="primary">刷新</n-button>
          </div>
        </n-card>
      </n-gi>
      <n-gi class="permissionCard">
        <n-card hoverable>
          <n-alert title="选用权限" type="info" class="marginBottom-15">
            在这里选用权限
          </n-alert>
          <n-tree
              block-line
              cascade
              checkable
              :data="data"
              v-model:checked-keys="checkedValue"
              :default-expand-all="true"
              :render-suffix="renderSuffixSelect"
          />
          <div class="flex flex-row flex-end">
            <n-button attr-type="button" type="primary" @click="submitPermission">保存</n-button>
          </div>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
import {ref, h} from 'vue'
import type {TreeOption} from 'naive-ui'
import {NButton} from 'naive-ui'

const data = <any>ref([])
const checkedValue = <any>ref([])
data.value = [
  {
    key: 'a',
    label: '全部',
    isLeaf: false,
    info: '',
    children: [
      {
        key: 0,
        label: '登录',
        info: '控制全局登录',
        isLeaf: true,
      },
      {
        key: 1,
        label: '用户管理',
        info: '控制用户管理',
        isLeaf: false,
        children: [
          {
            key: 2,
            label: '用户列表',
            info: '.....',
            isLeaf: true,
          },
          {
            key: 3,
            label: '用户管理',
            isLeaf: true,
          }
        ]
      },
      {
        key: 4,
        label: '系统管理',
        isLeaf: false,
        children: [
          {
            key: 5,
            label: '角色列表',
            isLeaf: true,
          },
          {
            key: 6,
            label: '角色管理',
            isLeaf: true,
          }
        ]
      }
    ]
  }
]

checkedValue.value = [6]

const editPermission = (option: any): void => {
  console.log(option);
}

const renderSuffix = ({option}: { option: TreeOption }) => {
  return [
    h(
        NButton,
        {text: true, type: 'info', onClick: () => editPermission(option)},
        {default: () => `编辑`}
    ),
    h(
        NButton,
        {text: true, type: 'primary', onClick: () => editPermission(option), style: 'margin-left: 15px'},
        {default: () => `新增`}
    ),
    h(
        NButton,
        {text: true, type: 'error', onClick: () => editPermission(option), style: 'margin-left: 15px'},
        {default: () => `删除`}
    )
  ]
}

const renderSuffixSelect = ({option}: { option: TreeOption }) => {
  return h(
      'span',
      {},
      {default: () => option.info || ''}
  )
}

const submitPermission = () => {
  console.log(checkedValue.value);
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
</style>
