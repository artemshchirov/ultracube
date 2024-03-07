<script setup>
// import Drawer from '@/components/Drawer/Drawer.vue'
import AppHeader from '@/components/AppHeader.vue'
import CardList from '@/components/Card/CardList.vue'
</script>
<!-- TODO: add like and add on main page icons transitions and icons in header -->
<template>
  <!-- <Drawer /> -->
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
