<script setup lang="ts">
import CardItem from '@/components/Card/CardItem.vue'
import { reactive } from 'vue'

const images = [
  '/sneakers/sneakers-1.jpg',
  '/sneakers/sneakers-2.jpg',
  '/sneakers/sneakers-3.jpg',
  '/sneakers/sneakers-4.jpg',
  '/sneakers/sneakers-5.jpg',
  '/sneakers/sneakers-6.jpg',
  '/sneakers/sneakers-7.jpg',
  '/sneakers/sneakers-8.jpg',
  '/sneakers/sneakers-9.jpg',
  '/sneakers/sneakers-10.jpg',
  '/sneakers/sneakers-11.jpg',
  '/sneakers/sneakers-12.jpg'
]

const cards = reactive(
  images.map((imageUrl, index) => ({
    title: `Product ${index + 1}`,
    price: Math.floor(Math.random() * 30) + 20,
    imageUrl,
    isFavorite: false,
    isAdded: false
  }))
)

const onClickAdd = (index: number) => {
  cards[index].isAdded = !cards[index].isAdded
}

const onClickFavorite = (index: number) => {
  cards[index].isFavorite = !cards[index].isFavorite
}
</script>

<template>
  <ul class="products__cards">
    <li v-for="(card, index) in cards" :key="index">
      <CardItem
        :title="card.title"
        :price="card.price"
        :imageUrl="card.imageUrl"
        :isFavorite="card.isFavorite"
        :isAdded="card.isAdded"
        :onClickAdd="() => onClickAdd(index)"
        :onClickFavorite="() => onClickFavorite(index)"
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
