<script setup lang="ts">
import CardItem from '@/components/Card/CardItem.vue'
import type { Product } from '@/interfaces/product'

defineProps<{
  products: Product[]
}>()

const emit = defineEmits(['addToFavorite'])
</script>

<template>
  <ul class="products__cards">
    <li v-for="product in products" :key="product.id">
      <CardItem v-bind="product" :onClickFavorite="() => emit('addToFavorite', product)" />
    </li>
  </ul>
</template>

<style scoped lang="scss">
.products {
  &__cards {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
  }
}
</style>
