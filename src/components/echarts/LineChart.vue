<template>
  <v-chart class="chart" :option="option" />
</template>

<script lang="ts" setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import VChart, { THEME_KEY } from "vue-echarts";
import {ref, provide, watch} from "vue";
import 'echarts/lib/component/grid';
import {
  TitleComponent,
} from "echarts/components";
import {useThemeStore} from "@/stores/base";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
]);

const themeStore = useThemeStore()

provide(THEME_KEY, themeStore.theme === 'darkTheme' ? 'dark' : 'default');

watch(themeStore, (newThemeStore) => {
  provide(THEME_KEY, newThemeStore.theme === 'darkTheme' ? 'dark' : 'default');
  // todo 插件刷新
}, { deep: true });


const option = ref({
  title: {
    text: "数据分析03",
    left: "center"
  },
  xAxis: {
    type: 'category',
    data: ['A', 'B', 'C']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150],
      type: 'line'
    }
  ]
});
</script>

<style scoped>
.chart {
  height: 600px;
}
</style>
