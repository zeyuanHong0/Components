<template>
  <div ref="chartRef" class="charts" style="width: 100%; height: 100%"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import * as echarts from "echarts";

// 传递进来的 props 用于动态设置图表数据
const props = defineProps({
  chartData: {
    type: Array,
    required: true,
  },
  xAxisData: {
    type: Array,
    required: true,
  },
  areaColor: {
    type: Object,
    default: () => ({
      start: "#DBECFF",
      end: "rgba(235, 246, 255, 0)",
    }),
  },
  lineColor: {
    type: String,
    default: "#0088FF", // 默认折线颜色
  },
});

const chartRef = ref(null); // 用于绑定 DOM 元素

let myChart = null; // 保存 ECharts 实例

const initChart = () => {
  // 初始化 ECharts 实例
  myChart = echarts.init(chartRef.value);

  // 设置 ECharts 的配置项
  const option = {
    grid: {
      top: "30px",
      left: "30px",
      right: "10px",
      bottom: "30px",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: props.xAxisData, // 动态设置 X 轴数据
      axisLabel: {
        color: "rgb(175, 175, 175)", // 设置X轴字体颜色
        fontSize: 12, // 设置X轴字体大小
      },
      axisLine: {
        lineStyle: {
          color: "rgb(175, 175, 175)", // 设置X轴线的颜色
        },
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "rgb(175, 175, 175)", // 设置X轴字体颜色
        fontSize: 12, // 设置X轴字体大小
      },
    },
    series: [
      {
        data: props.chartData, // 动态设置 Y 轴数据
        type: "line",
        lineStyle: {
          color: props.lineColor,
          with: 3,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              { offset: 0, color: props.areaColor.start },
              { offset: 1, color: props.areaColor.end },
            ],
            false
          ),
        },
        smooth: true,
        // 默认隐藏小圆点
        symbol: "none",
        // 鼠标悬停时显示小圆点
        emphasis: {
          focus: "series",
          itemStyle: {
            symbol: "circle", // 小圆点的形状
            symbolSize: 10, // 小圆点的大小
          },
        },
      },
    ],
  };

  myChart.setOption(option);
  myChart.resize();
  window.addEventListener("resize", function () {
    myChart.resize();
  });
};

onMounted(() => {
  initChart(); // 初始化图表
});

watch(
  () => [props.chartData, props.xAxisData],
  () => {
    if (myChart) {
      // 数据变化时更新图表
      myChart.setOption({
        xAxis: {
          data: props.xAxisData,
        },
        series: [
          {
            data: props.chartData,
          },
        ],
      });
    }
  }
);
</script>

<style scoped></style>
