<template>
  <n-form
      v-if="props.searchParams.length > 0"
      ref="formRef"
      inline
      label-align="left"
      label-placement="left"
      :model="search"
  >
    <n-form-item v-for="value of props.searchParams" :label="value[1]" path="user.name" width="200">
      <n-input v-model:value="search[value[2]]" :placeholder="`请输入${value[1]}`" v-if="value[0] === 'input'"/>
      <n-select
          style="width: 200px"
          v-if="value[0] === 'select'"
          v-model:value="search[value[2]]"
          :placeholder="`请选择${value[1]}`"
          :options="value[4]"
          :multiple="value[5] === 'multiple'"
      />
      <n-switch v-if="value[0] === 'switch'" v-model:value="search[value[2]]"/>
    </n-form-item>
    <n-form-item>
      <n-button attr-type="button" type="warning" @click="clearSearch">重置条件</n-button>
      <n-button attr-type="button" type="success" @click="submitSearch" style="margin-left: 15px">搜索</n-button>
    </n-form-item>
  </n-form>

  <n-data-table
      remote
      ref="table"
      :columns="tableColumns"
      :data="props.data"
      :row-key="rowKey"
      :loading="props.loading"
      @update:checked-row-keys="handleCheck"
      @update:sorter="handleSorterChange"
  />

  <n-divider />

  <n-space justify="space-between">
    <n-space>
      <div v-if="props.selectionParams.length > 0" v-for="value of props.selectionParams">
        <n-popconfirm
            @positive-click="toEmit(value[2])"
        >
          <template #trigger>
            <n-button :type="value[1]" :disabled="checkIds.length === 0" class="batchButton">
              {{ value[0] }}
            </n-button>
          </template>
          确定{{ value[0] }}?
        </n-popconfirm>
      </div>
    </n-space>
    <n-pagination v-model:page="props.pagination.page" :item-count="props.pagination.itemCount" size="large"
                  :page-size="props.pagination.pageSize" :prefix="props.pagination.prefix"/>
  </n-space>

</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue'
import type {DataTableRowKey} from 'naive-ui'

const props = defineProps({
  columns: {
    type: Array,
    default: []
  },
  data: {
    type: Array,
    default: []
  },
  loading: {
    type: Boolean,
    default: false
  },
  pagination: {
    type: Object,
    default: {
      page: 1,
      itemCount: 1,
      pageSize: 10,
      prefix({itemCount}: { itemCount: string }) {
        return `总数：${itemCount}`
      }
    }
  },
  searchParams: {
    type: Array,
    default: []
  },
  selectionParams: {
    type: Array,
    default: []
  }
})


const emit = defineEmits(['updateSorter', 'submitSearch', 'batchSubmit'])

const tableColumns = <any>ref([])
const data = props.data
const keyArr = <any>ref([])
const search = <any>ref([])
const propsColumns = <any>props.columns
const checkIds = <any>ref([])

for (let column of propsColumns) {
  keyArr.value.push(column[2] || 'selection')
  switch (column[0]) {
    case 'selection':
      tableColumns.value.push({
        type: 'selection'
      })
      break;
    case 'render':
      let obj = {
        title: column[1],
        key: column[2],
        ...column[3],
        sorter: column[4],
        sortOrder: false,
        ...column[5] ? {filter: true, filterOptions: column[6]} : {}
      }
      tableColumns.value.push(obj)
      break;
    default:
      tableColumns.value.push({
        title: column[1],
        key: column[2],
        sorter: column[4],
        sortOrder: false,
        ...column[5] ? {filter: true, filterOptions: column[6]} : {}
      })
      break;
  }
}

const rowKey = (rowData: { id: any }) => {
  return rowData.id
}
const handleSorterChange = (sorter: { columnKey: any; order: any }) => {
  let key = sorter.columnKey
  let index = keyArr.value.indexOf(key)
  tableColumns.value[index].sortOrder = !sorter ? false : sorter.order
  emit('updateSorter', sorter)
}

const clearSearch = () => {
  props.searchParams.map((v: any) => {
    search.value[v[2]] = v[3]
  })
}

const submitSearch = () => {
  emit('submitSearch', search.value)
}

const toEmit = (type: string) => {
  emit('batchSubmit', type, checkIds.value)
}

const handleCheck = (rowKeys: DataTableRowKey[]) => {
  checkIds.value = rowKeys
}

//重置筛选条件
onMounted(() => {
  clearSearch()
})

</script>

<style scoped lang="sass" rel="stylesheet/sass">
.batchButton
  margin-left: 15px

  &:first-of-type
    margin-left: 0
</style>
