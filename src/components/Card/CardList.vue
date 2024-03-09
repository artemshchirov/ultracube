<script setup lang="ts">
import CardItem from '@/components/Card/CardItem.vue'

type Card = {
  id: number
  title: string
  price: number
  imageUrl: string
}

const { cards } = defineProps<{
  cards: Card[]
}>()

const onClickAdd = () => {
  alert('Added')
}

const onClickFavorite = () => {
  alert('Favorite')
}
</script>

<template>
  <ul class="products__cards">
    <li v-for="card in cards" :key="card.id">
      <CardItem
        :title="card.title"
        :price="card.price"
        :imageUrl="card.imageUrl"
        :onClickAdd="() => onClickAdd()"
        :onClickFavorite="() => onClickFavorite()"
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
