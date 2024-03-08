<script setup>
// import Drawer from '@/components/Drawer/Drawer.vue'
import AppHeader from '@/components/AppHeader.vue'
import ProductsSection from './components/ProductsSection.vue'
</script>
<!-- TODO: add like and add on main page icons transitions and icons in header -->
<template>
  <!-- <Drawer /> -->
  <div class="page">
    <AppHeader />
    <ProductsSection />
  </div>
</template>

<style lang="scss">
.page {
  width: 80%;
  margin: 56px auto 0;
  background: var(--color-page-background);
  border-radius: 24px;
  box-shadow: $shadow-sm, $shadow-xl;
}
</style>
