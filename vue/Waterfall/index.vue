<template>
  <div
    ref="containerRef"
    class="waterfall-container"
    :style="{ height: containerHeight + 'px' }"
  >
    <div
      v-for="(item, index) in list"
      :key="item.id || index"
      class="waterfall-item"
      :style="{
        top: positions[index]?.top + 'px',
        left: positions[index]?.left + 'px',
        width: itemWidth + 'px',
        position: 'absolute',
      }"
      ref="itemRefs"
    >
      <slot :item="item" :index="index" />
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  watchEffect,
  nextTick,
  onMounted,
  onBeforeUnmount,
} from "vue";

const props = defineProps({
  list: { type: Array, required: true },
  breakpoints: {
    type: Object,
    default: () => ({ 0: 1, 768: 2, 1024: 3 }),
  },
});

// refs
const containerRef = ref(null);
const itemRefs = ref([]);
const positions = reactive([]);
const containerHeight = ref(0);
const itemWidth = ref(0);

let columnHeights = [];
let resizeObserver;

function getColumnCount() {
  const width = window.innerWidth;
  const sorted = Object.keys(props.breakpoints)
    .map(Number)
    .sort((a, b) => a - b);
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (width >= sorted[i]) {
      return props.breakpoints[sorted[i]];
    }
  }
  return 1;
}

function layout() {
  const colCount = getColumnCount();
  const containerWidth = containerRef.value.clientWidth;
  const colWidth = containerWidth / colCount;
  itemWidth.value = colWidth;

  columnHeights = new Array(colCount).fill(0);
  positions.length = props.list.length;

  props.list.forEach((_, index) => {
    const el = itemRefs.value[index];
    if (!el) return;

    const height = el.offsetHeight;
    const minCol = columnHeights.indexOf(Math.min(...columnHeights));
    const top = columnHeights[minCol];
    const left = colWidth * minCol;

    positions[index] = { top, left };
    columnHeights[minCol] += height;
  });

  containerHeight.value = Math.max(...columnHeights);
}

function updateLayout() {
  nextTick(() => {
    layout();
  });
}

watchEffect(() => {
  updateLayout();
});

onMounted(() => {
  resizeObserver = new ResizeObserver(updateLayout);
  resizeObserver.observe(document.body);
});

onBeforeUnmount(() => {
  resizeObserver.disconnect();
});
</script>

<style scoped>
.waterfall-container {
  position: relative;
  width: 100%;
}
</style>
