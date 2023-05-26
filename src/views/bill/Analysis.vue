<template>
  <div>
    <v-table :columns="columns" :data="data" :loading="loading" :pagination="pagination"
             @updateSorter="updateSorter" @update:filters="updateFilters" @update:page="updatePage"></v-table>
  </div>
</template>

<script lang="ts" setup>
import {ref, h} from 'vue'
import VTable from '@/components/coms/Table.vue'
import {NTag, NButton} from 'naive-ui'

const columns = <any>ref([])
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
  ['', '年龄', 'age', {}, true, true, [{label: '<20', value: 1}, {label: '>=20', value: 2}]],
  ['render', '标签', 'tags', {
    render(row: { tags: any[] }) {
      return row.tags.map((tagKey) => {
        return h(
            NTag,
            {
              style: {
                marginRight: '6px'
              },
              type: 'info',
              bordered: false
            },
            {
              default: () => tagKey
            }
        )
      })
    }
  }, true, true, [{label: '<20', value: 1}, {label: '>=20', value: 2}]],
  ['', '注册时间', 'createdAt', '', true, false, []],
  ['render', '操作', 'actions', {
    render(row: any) {
      return h(
          NButton,
          {
            size: 'small',
            onClick: () => sendMail(row)
          },
          {default: () => 'Send Email' + '--' + row.name}
      )
    }
  }, false, false, []],
]

const sendMail = (row: any) => {
  data.value.push({
    'id': 3,
    'name': 'Kit',
    'age': 30,
    'tags': ['cool', 'teacher-1'],
    'createdAt': '2022-02-034 22:00:00',
  })
  console.log(row);
}

const getLists = (page: number, size: number) => {
  setTimeout(()=> {
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
const updateFilters = (filters: any) => {
  loading.value = !loading.value
  getLists(pagination.page, pagination.pageSize)
  console.log(filters);
}
const updatePage = (currentPage: any) => {
  loading.value = !loading.value
  pagination.value.page = currentPage
  getLists(pagination.page, pagination.pageSize)
  console.log(currentPage);
}

</script>

<style scoped lang="sass" rel="stylesheet/sass">

</style>
