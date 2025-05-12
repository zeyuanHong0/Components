<template>
  <Waterfall :list="items" :breakpoints="{ 0: 1, 768: 2, 1200: 3 }">
    <template #default="{ item }">
      <div
        :style="{
          height: item.height + 'px',
          backgroundColor: '#f0f0f0',
          margin: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }"
      >
        {{ item.content }}
      </div>
    </template>
  </Waterfall>
</template>

<script setup>
import { ref } from "vue";
import Waterfall from "./components/Waterfall/index.vue";

// 随机高度
const randomHeight = () => Math.floor(Math.random() * 200) + 100;
const randomItems = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    height: randomHeight(),
    content: `Item ${i + 1}`,
  }));
};
const items = ref(randomItems());
</script>

<style scoped></style>
