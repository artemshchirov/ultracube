<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import axios from 'axios'

import CardList from './Card/CardList.vue'

const products = ref([])

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onChangeSelect = (event: Event) => {
  const target = event.target as HTMLSelectElement
  filters.sortBy = target.value
}

const onChangeSearchInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  filters.searchQuery = target.value
}

const fetchProducts = async () => {
  try {
    const params: Record<string, string> = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get('https://12055c66f459ccac.mokky.dev/products', { params })
    products.value = data
  } catch (err) {
    console.error(err)
  }
}

onMounted(fetchProducts)

watch(filters, fetchProducts)
</script>

<template>
  <section class="products">
    <div class="products__header">
      <h2 class="products__title">All cubes</h2>

      <div class="products__settings">
        <select @change="onChangeSelect" class="products__sort">
          <option value="name">Name</option>
          <option value="price">Price (Low to High)</option>
          <option value="-price">Price (High to Low)</option>
        </select>

        <div class="products__search">
          <img class="products__search-icon" src="/search.svg" alt="Search" />
          <input
            @input="onChangeSearchInput"
            class="products__search-input"
            placeholder="Search..."
          />
        </div>
      </div>
    </div>

    <CardList :cards="products" />
  </section>
</template>

<style scoped lang="scss">
.products {
  padding: 40px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
  }

  &__title {
    font-size: 1.875rem; /* 30px */
    line-height: 2.25rem; /* 36px */
  }

  &__settings {
    display: flex;
    gap: 16px;
  }

  &__sort {
    border: 1px solid var(--color-input-border);
    border-radius: $input-border-radius;
    padding: 8px 12px;
    outline: none;
  }

  &__search {
    position: relative;

    &-icon {
      position: absolute;
      left: 16px;
      top: 9.5px;

      z-index: 1;
    }

    &-input {
      border: 1px solid var(--color-input-border);
      border-radius: $input-border-radius;
      padding: 9px 16px 8px 44px;
      outline: none;

      &:focus {
        border-color: var(--color-input-border-focus);
      }
    }
  }
}
</style>
