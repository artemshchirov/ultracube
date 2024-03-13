<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { API_URL } from '@/constants'
import CardList from '@/components/Card/CardList.vue'

const favorites = ref([])

onMounted(async () => {
  try {
    const { data: favoritesData } = await axios.get(`${API_URL}/favorites?_relations=products`)
    favorites.value = favoritesData.flatMap((favorite) => favorite.product)
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <section class="favorites">
    <div class="favorites__header">
      <h2 class="favorites__title">My Favorites</h2>
    </div>

    <CardList :products="favorites" is-favorites />
  </section>
</template>

<style scoped lang="scss">
.favorites {
  &__header {
    margin-bottom: 40px;
  }

  &__title {
    font-size: 1.875rem; /* 30px */
    line-height: 2.25rem; /* 36px */
  }
}
</style>
