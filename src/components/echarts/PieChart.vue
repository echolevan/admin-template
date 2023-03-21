<template>
  <v-chart ref="chartRef" class="chart" :option="option"/>
</template>

<script setup>
import {use} from "echarts/core";
import {CanvasRenderer} from "echarts/renderers";
import {PieChart} from "echarts/charts";
import {
  TitleComponent,
  ToolboxComponent,
  LegendComponent
} from "echarts/components";
import VChart, {THEME_KEY} from "vue-echarts";
import {ref, provide, watch} from "vue";
import {useThemeStore} from "@/stores/base";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  ToolboxComponent,
  LegendComponent
]);

const themeStore = useThemeStore()

provide(THEME_KEY, themeStore.theme === 'darkTheme' ? 'dark' : 'default');

watch(themeStore, (newThemeStore) => {
  provide(THEME_KEY, newThemeStore.theme === 'darkTheme' ? 'dark' : 'default');
  // todo 插件刷新
}, { deep: true });


const option = ref({
  title: {
    text: "数据分析",
    left: "center"
  },
  legend: {
    top: 'bottom'
  },
  toolbox: {
    show: true,
    feature: {
      mark: {show: true},
      dataView: {show: true, readOnly: false},
      restore: {show: true},
      saveAsImage: {show: true}
    }
  },
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [50, 250],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data: [
        {value: 40, name: 'rose 1'},
        {value: 38, name: 'rose 2'},
        {value: 32, name: 'rose 3'},
        {value: 30, name: 'rose 4'},
        {value: 28, name: 'rose 5'},
        {value: 26, name: 'rose 6'},
        {value: 22, name: 'rose 7'},
        {value: 18, name: 'rose 8'}
      ]
    }
  ]
});
</script>

<style scoped>
.chart {
  height: 600px;
}
</style>
