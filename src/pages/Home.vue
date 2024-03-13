<script setup lang="ts">
import { inject, onMounted, reactive, ref, watch } from 'vue'
import debounce from 'lodash.debounce'
import CardList from '@/components/Card/CardList.vue'
import { API_URL } from '@/constants'
import type { Cart } from '@/interfaces/cart'
import type { AddToFavoriteFunction, Favorite } from '@/interfaces/favorite'
import type { Product } from '@/interfaces/product'
import axios from 'axios'

const products = ref<Product[]>([])

const { cart, addToCart, removeFromCart } = inject('cart') as Cart

const restoreFilters = () => {
  const defaultFilters = { sortBy: 'title', searchQuery: '' }
  const savedFilters = localStorage.getItem('filters')
  return savedFilters ? JSON.parse(savedFilters) : defaultFilters
}

const filters = reactive(restoreFilters())

const onClickAddCard = (product: Product) => {
  if (!product.isAdded) addToCart(product)
  else removeFromCart(product)
}

const onChangeSelect = (event: Event) => {
  const target = event.target as HTMLSelectElement
  filters.sortBy = target.value
  localStorage.setItem('filters', JSON.stringify(filters))
}

const onChangeSearchInput = debounce((event: Event) => {
  const target = event.target as HTMLInputElement
  filters.searchQuery = target.value
  localStorage.setItem('filters', JSON.stringify(filters))
}, 250)

const addToFavorite: AddToFavoriteFunction = async (product: Product) => {
  try {
    if (!product.isFavorite) {
      const newFavoriteProductData = { product_id: product.id }
      product.isFavorite = true
      const { data: favoriteData } = await axios.post(
        `${API_URL}/favorites`,
        newFavoriteProductData
      )
      product.favoriteId = favoriteData.id
    } else {
      product.isFavorite = false
      await axios.delete(`${API_URL}/favorites/${product.favoriteId}`)
      product.favoriteId = null
    }
  } catch (err) {
    console.error(err)
  }
}

const fetchProducts = async () => {
  try {
    const params: Record<string, string> = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data: productsData } = await axios.get(`${API_URL}/products`, { params })

    products.value = productsData.map((product: Product) => ({
      ...product,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (err) {
    console.error(err)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favoritesData } = await axios.get<Favorite[]>(`${API_URL}/favorites`)
    const favoritesMap = new Map<number, Favorite>(
      favoritesData.map((fav) => [fav.product_id, fav])
    )

    products.value = products.value.map((product: Product) => {
      const favorite = favoritesMap.get(product.id)

      return {
        ...product,
        isFavorite: favorite !== undefined,
        favoriteId: favorite ? favorite.id : null,
        isAdded: false
      }
    })
  } catch (err) {
    console.error(err)
  }
}

const updateProductStates = async () => {
  await fetchProducts()
  await fetchFavorites()

  products.value = products.value.map((product) => ({
    ...product,
    isAdded: cart.value.some((cartItem) => cartItem.id === product.id)
  }))
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  restoreFilters()
  await updateProductStates()
})

watch(filters, updateProductStates)

watch(
  cart,
  () => {
    products.value = products.value.map((product) => ({
      ...product,
      isAdded: cart.value.some((cartItem) => cartItem.id === product.id)
    }))
  },
  { deep: true, immediate: true }
)
</script>

<template>
  <section class="home">
    <div class="home__header">
      <h2 class="home__title">All cubes</h2>

      <div class="home__settings">
        <select @change="onChangeSelect" class="home__sort">
          <option value="title">Name</option>
          <option value="price">Price (Low to High)</option>
          <option value="-price">Price (High to Low)</option>
        </select>

        <div class="home__search">
          <img class="home__search-icon" src="/search.svg" alt="Search" />
          <input @input="onChangeSearchInput" class="home__search-input" placeholder="Search..." />
        </div>
      </div>
    </div>

    <CardList
      :products="products"
      @add-to-favorite="addToFavorite"
      @on-click-add-card="onClickAddCard"
    />
  </section>
</template>

<style scoped lang="scss">
.home {
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
    border-radius: $border-radius-input;
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
      border-radius: $border-radius-input;
      padding: 9px 16px 8px 44px;
      outline: none;

      &:focus {
        border-color: var(--color-input-border-focus);
      }
    }
  }
}
</style>
