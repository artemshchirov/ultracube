<script setup lang="ts">
import Card from './Card.vue'
</script>

<template>
  <section class="products-section">
    <h2 class="products-section__title">All cubes</h2>

    <ul class="products-section__cards">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </ul>
  </section>
</template>

<style scoped lang="scss">
.products-section {
  padding: 40px;

  &__title {
    font-size: 1.875rem; /* 30px */
    line-height: 2.25rem; /* 36px */
    padding-bottom: 32px;
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
  }
}
</style>
