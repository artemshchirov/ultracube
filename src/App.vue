<script setup>
import { ref, provide } from 'vue'

import Drawer from '@/components/Drawer/Drawer.vue'
import AppHeader from '@/components/AppHeader.vue'
import Products from '@/components/Products.vue'

const isDrawerOpen = ref(false)

const openDrawer = () => (isDrawerOpen.value = true)
const closeDrawer = () => (isDrawerOpen.value = false)

provide('cartActions', {
  openDrawer,
  closeDrawer
})
</script>

<template>
  <Drawer v-if="isDrawerOpen" />
  <div class="page">
    <AppHeader @open-drawer="openDrawer" />
    <Products />
  </div>
</template>

<style lang="scss">
.page {
  width: 80%;
  margin: 56px auto;
  background: var(--color-page-background);
  border-radius: 24px;
  box-shadow: $shadow-sm, $shadow-xl;
}
</style>

<!-- TODO: add like and add on main page icons transitions and icons in header -->./components/Products.vue
