<template>
  <div>
    <v-table :columns="columns" :data="data" :loading="loading" :pagination="pagination" :searchParams="searchParams"
             @updateSorter="updateSorter" @update:filters="updateFilters" @update:page="updatePage"
             @submitSearch="submitSearch"></v-table>
  </div>
</template>

<script lang="ts" setup>
import {ref, h} from 'vue'
import VTable from '@/components/coms/Table.vue'
import {NTag, NButton} from 'naive-ui'
import {apiChangeStatus, apiGetUser} from "@/api/user";

const columns = <any>ref([])
const searchParams = <any>ref([])
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
  ['', '注册地址', 'address', {}, false, false, []],
  ['', '门罗币充值地址', 'xmr_address', {}, false, false, []],
  ['', 'google私钥', 'google_secret', {}, false, false, []],
  ['render', '助记词是否已备份', 'help_words_back_up', {
    render(row: any) {
      return h(
          NTag,
          {
            size: 'small',
            type: row.help_words_back_up === 1 ? 'success' : 'error',
          },
          {default: () => row.help_words_back_up === 1 ? '已备份' : '未备份'}
      )
    }
  }, false, false, []],
  ['', '大区业绩', 'max_achievement', {}, false, false, []],
  ['', '小区业绩', 'min_achievement', {}, false, false, []],
  ['', '手续费折扣百分比', 'fee_discount', {}, false, false, []],
  ['render', '状态', 'status', {
    render(row: any) {
      return h(
          NTag,
          {
            size: 'small',
            type: row.status === 1 ? 'success' : 'error',
          },
          {default: () => row.status === 1 ? '正常' : '冻结'}
      )
    }
  }, false, false, []],
  ['render', '操作', 'actions', {
    render(row: any) {
      return h(
          NButton,
          {
            size: 'small',
            type: 'warning',
            onClick: () => changeStatus(row)
          },
          {default: () => '禁/启用'}
      )
    }
  }, false, false, []],
]

searchParams.value = [
  // 类型、字段中文名、字段名、 默认值、 筛选条件
  ['input', '注册地址', 'address', '', []],
]

const changeStatus = (row: any) => {
  apiChangeStatus(row.id).then(()=> {
    getLists(pagination.page, pagination.pageSize)
  })
}

const getLists = (page: number, size: number, search: any = {}) => {
  apiGetUser(page, size, search).then((res)=> {
    data.value = res.data
    pagination.value.itemCount = res.total
    loading.value = false
  })
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

const submitSearch = (search: any) => {
  loading.value = !loading.value
  pagination.value.page = 1
  getLists(pagination.page, pagination.pageSize, search)
}

</script>

<style scoped lang="sass" rel="stylesheet/sass">

</style>
