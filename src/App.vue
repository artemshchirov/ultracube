<script setup lang="ts">
import CardList from './components/CardList.vue'
import Header from './components/Header.vue'
</script>

<template>
  <div class="page">
    <Header />
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
