<script setup lang="ts">
import type { Cart } from '@/App.vue'
import { inject } from 'vue'

const { closeDrawer } = inject('cart') as Cart
</script>

<template>
  <div class="overlay" @click="closeDrawer" />
</template>

<style scoped lang="scss">
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: black;
  opacity: 0.5;
  z-index: 10;
}
</style>
