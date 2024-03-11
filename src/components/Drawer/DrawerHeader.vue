<script setup lang="ts">
import { inject } from 'vue'

import CloseIcon from '@/components/icons/CloseIcon.vue'
import type { CartActions } from '@/App.vue'

const closeDrawer = (inject('cart') as CartActions).closeDrawer
</script>

<template>
  <header class="drawer-header">
    <CloseIcon @click="closeDrawer" />
    <h2 class="drawer-header__title">Shopping cart</h2>
  </header>
</template>

<style scoped lang="scss">
.drawer-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

.drawer-header__title {
  font-size: 24px;
  font-weight: 700;
}
</style>
