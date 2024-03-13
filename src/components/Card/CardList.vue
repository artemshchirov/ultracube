<script setup lang="ts">
import CardItem from '@/components/Card/CardItem.vue'
import type { Product } from '@/interfaces/product'

interface Props {
  products: Product[]
  isFavorites?: boolean
}

defineProps<Readonly<Props>>()

const emit = defineEmits(['addToFavorite', 'onClickAddCard'])
</script>

<template>
  <ul class="products__cards" v-auto-animate>
    <li v-for="product in products" :key="product.id">
      <CardItem
        :is-favorite="product.isFavorite"
        :image-url="product.imageUrl"
        :title="product.title"
        :price="product.price"
        :on-click-favorite="isFavorites ? undefined : () => emit('addToFavorite', product)"
        :on-click-add="isFavorites ? undefined : () => emit('onClickAddCard', product)"
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
