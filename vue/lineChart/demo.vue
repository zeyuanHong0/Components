<template>
  <div>
    <LineChart
      :chartData="chartData"
      :xAxisData="xAxisData"
      :areaColor="{ start: '#DBECFF', end: 'rgba(235, 246, 255, 0)' }"
      lineColor="#0088FF"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: "",
};
</script>

<script setup lang="ts">
import LineChart from "./index.vue";

const chartData = [820, 932, 901, 934, 1290, 1330, 1320];
const xAxisData = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
</script>

<style lang="scss" scoped></style>
