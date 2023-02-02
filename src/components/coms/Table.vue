<template>
  <n-data-table
      remote
      ref="table"
      :columns="tableColumns"
      :data="data"
      :row-key="rowKey"
      :loading="loading"
      :pagination="pagination"
      @update:sorter="handleSorterChange"
  />
  <!--  @update:filters="handleFiltersChange"-->
  <!--  @update:page="handlePageChange"-->
</template>

<script lang="ts">
import {defineComponent, ref, reactive, onMounted} from 'vue'

export default defineComponent({
  props: {
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
      default: {}
    },
  },
  setup(props, ctx) {
    const tableColumns = <any>ref([])
    const data = props.data
    const loading = props.loading
    const pagination = props.pagination
    const keyArr = <any>ref([])
    const propsColumns = <any>props.columns

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

    return {
      data,
      tableColumns,
      loading,
      pagination,
      rowKey (rowData: { id: any }) {
        return rowData.id
      },
      handleSorterChange(sorter: { columnKey: any; order: any }) {
        let key = sorter.columnKey
        let index = keyArr.value.indexOf(key)
        console.log(index);
        console.log(tableColumns.value);
        tableColumns.value[index].sortOrder = !sorter ? false : sorter.order
      },
      // handleFiltersChange(filters) {
      //   console.log('table', filters);
      // },
      // handlePageChange(currentPage) {
      //   console.log('table', currentPage);
      // }
    }
  }
})
</script>

<style scoped lang="sass" rel="stylesheet/sass">

</style>
