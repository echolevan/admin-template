<template>
  <div>
    <n-grid x-gap="12" :cols="3">
      <n-gi>
        <v-pie-chart></v-pie-chart>
      </n-gi>
      <n-gi>
        <v-bar-chart></v-bar-chart>
      </n-gi>
      <n-gi>
        <v-line-chart></v-line-chart>
      </n-gi>
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
import VPieChart from '@/components/echarts/PieChart.vue'
import VBarChart from '@/components/echarts/BarChart.vue'
import VLineChart from '@/components/echarts/LineChart.vue'
</script>

<style scoped lang="sass" rel="stylesheet/sass">

</style>
