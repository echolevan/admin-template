<template>
  <div>
    <n-row>
      <n-col :span="12">
        <n-statistic label="统计数据" :value="99">
          <template #prefix>
            <n-icon>
<!--              <md-save />-->
            </n-icon>
          </template>
          <template #suffix>
            / 100
          </template>
        </n-statistic>
      </n-col>
      <n-col :span="12">
        <n-statistic label="活跃用户">
          1,234,123
        </n-statistic>
      </n-col>
    </n-row>
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
