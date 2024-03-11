<script setup lang="ts">
import type { CartActions } from '@/App.vue'
import CardItem from '@/components/Card/CardItem.vue'
import type { Product } from '@/interfaces/product'
import { inject } from 'vue'

defineProps<{
  products: Product[]
}>()

const emit = defineEmits(['addToFavorite'])
const { addToCart } = inject('cart') as CartActions
</script>

<template>
  <ul class="products__cards">
    <li v-for="product in products" :key="product.id">
      <CardItem
        :is-favorite="product.isFavorite"
        :image-url="product.imageUrl"
        :title="product.title"
        :price="product.price"
        :on-click-favorite="() => emit('addToFavorite', product)"
        :on-click-add="() => addToCart(product)"
        :is-added="product.isAdded"
      />
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
