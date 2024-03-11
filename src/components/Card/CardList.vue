<script setup lang="ts">
import { inject } from 'vue'

import CardItem from '@/components/Card/CardItem.vue'
import type { Cart } from '@/interfaces/cart'
import type { AddToFavoriteFunction } from '@/interfaces/favorite'
import type { Product } from '@/interfaces/product'

defineProps<{
  products: Product[]
}>()

const addToFavorite = inject('addToFavorite') as AddToFavoriteFunction
const { onClickAddCard } = inject('cart') as Cart
</script>

<template>
  <ul class="products__cards" v-auto-animate>
    <li v-for="product in products" :key="product.id">
      <CardItem
        :is-favorite="product.isFavorite"
        :image-url="product.imageUrl"
        :title="product.title"
        :price="product.price"
        :on-click-favorite="() => addToFavorite(product)"
        :on-click-add="() => onClickAddCard(product)"
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
