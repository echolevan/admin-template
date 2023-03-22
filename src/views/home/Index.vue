<template>
  <div>
    <n-grid x-gap="12" :cols="4" id="homeCard">
      <n-gi v-for="value of numberShow">
        <n-card :title="value.title" hoverable>
          <n-statistic label="" tabular-nums>
            <n-number-animation
                show-separator
                :from="0"
                :to="value.to"
                :active="true"
            />
          </n-statistic>
        </n-card>
      </n-gi>
    </n-grid>
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

const numberShow = [
  {
    'title': '今日访问',
    'to': 10000
  },
  {
    'title': '今日营收',
    'to': 99999
  },
  {
    'title': '今日新增用户量',
    'to': 230
  },
  {
    'title': '今日收藏',
    'to': 885
  },
]

</script>

<style scoped lang="sass" rel="stylesheet/sass">
#homeCard
  margin-bottom: 15px
</style>
