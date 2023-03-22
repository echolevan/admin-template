<template>
  <div>
    <n-button type="primary" @click="addRole">新增角色</n-button>
    <n-divider />
    <v-table :columns="columns" :data="data" :loading="loading" :pagination="pagination" :searchParams="searchParams" :selectionParams="selectionParams"
             @updateSorter="updateSorter" @update:page="updatePage" @submitSearch="submitSearch" @batchSubmit="batchSubmit"></v-table>
  </div>
</template>

<script lang="ts" setup>
import {ref, h} from 'vue'
import VTable from '@/components/coms/Table.vue'
import {NButton} from 'naive-ui'

const columns = <any>ref([])
const searchParams = <any>ref([])
const selectionParams = <any>ref([])
const data = <any>ref([])
const loading = ref(true)
const pagination = <any>ref({
  page: 1,
  itemCount: 100,
  pageSize: 10,
  prefix({itemCount}: { itemCount: string }) {
    return `总数：${itemCount}`
  }
})

columns.value = [
  ['selection'],
  ['', '名称', 'name', {}, false, false, []],
  ['', '备注', 'note', {}, false, false, []],
  ['', '更新时间', 'createdAt', '', true, false, []],
  ['render', '操作', 'actions', {
    render(row: any) {
      return [
        h(
            NButton,
            {
              size: 'small',
              type: 'info',
              onClick: () => operationRole(row, 'edit')
            },
            {default: () => '编辑'}
        ),
        h(
            NButton,
            {
              size: 'small',
              type: 'primary',
              onClick: () => operationRole(row, 'copy'),
              style: 'margin-left: 15px'
            },
            {default: () => '复制'}
        ),
        h(
            NButton,
            {
              size: 'small',
              type: 'error',
              onClick: () => operationRole(row, 'delete'),
              style: 'margin-left: 15px'
            },
            {default: () => '删除'}
        )
      ]
    }
  }, false, false, []],
]

searchParams.value = [
  // 类型、字段中文名、字段名、 默认值、 筛选条件
  ['input', '角色名称', 'name', '', []],
]

selectionParams.value = [
  ['删除', 'error', 'batchDelete'],
  ['禁用', 'warning', 'batchDisable'],
]

const operationRole = (row: any, type: string) => {
  console.log(row, type);
}

const getLists = (page: number, size: number) => {
  setTimeout(() => {
    data.value = [
      {'id': 1, 'name': 'tom', 'age': 18, 'tags': ['cool-1', 'teacher'], 'createdAt': '2022-02-02 22:00:00',},
      {
        'id': 2,
        'name': 'Jell',
        'age': 30,
        'tags': ['cool', 'teacher'],
        'createdAt': '2022-02-03 22:00:00',
      }
    ]
    loading.value = false
  }, 1000)
}

// 获取数据
getLists(pagination.page, pagination.pageSize)

const updateSorter = (sorter: any) => {
  pagination.value.itemCount = 106
  loading.value = !loading.value
  getLists(pagination.page, pagination.pageSize)
  console.log(sorter);
}

const updatePage = (currentPage: any) => {
  loading.value = !loading.value
  pagination.value.page = currentPage
  getLists(pagination.page, pagination.pageSize)
  console.log(currentPage);
}

const submitSearch = (search: any) => {
  loading.value = !loading.value
  pagination.value.page = 1
  getLists(pagination.page, pagination.pageSize)
  console.log(search);
}

const batchSubmit = (type: string, ids: any) => {
  console.log(type, ids);
}

const addRole = () => {
  console.log('addRole');
}

</script>

<style scoped lang="sass" rel="stylesheet/sass">

</style>
