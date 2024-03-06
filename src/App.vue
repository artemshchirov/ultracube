<script setup>
import Drawer from './components/Drawer.vue'
import AppHeader from './components/AppHeader.vue'
import CardList from './components/CardList.vue'
</script>

<template>
  <Drawer />
  <div class="page">
    <AppHeader />
    <CardList />
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
