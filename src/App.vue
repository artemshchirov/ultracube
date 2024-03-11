<script setup lang="ts">
import { ref, provide, computed, watch, onMounted, reactive } from 'vue'

import Drawer from '@/components/Drawer/Drawer.vue'
import AppHeader from '@/components/AppHeader.vue'
import Products from '@/components/Products.vue'
import type { Product } from './interfaces/product'
import axios from 'axios'
import type { AddToFavoriteFunction, Favorite } from './interfaces/favorite'
import type { Cart } from './interfaces/cart'

const API_URL = 'https://12055c66f459ccac.mokky.dev'

const cart = ref<Product[]>([])

const products = ref<Product[]>([])

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

const fetchFavorites = async () => {
  try {
    const { data: favoritesData } = await axios.get<Favorite[]>(`${API_URL}/favorites`)

    const favoritesMap = new Map<number, Favorite>(favoritesData.map((fav) => [fav.parentId, fav]))

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

const fetchProducts = async () => {
  try {
    const params: Record<string, string> = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`${API_URL}/products`, { params })
    products.value = data.map((product: Product) => ({
      ...product,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (err) {
    console.error(err)
  }
}

const addToFavorite: AddToFavoriteFunction = async (product: Product) => {
  try {
    if (!product.isFavorite) {
      const newFavoriteProductData = { parentId: product.id }
      product.isFavorite = true
      const { data } = await axios.post(`${API_URL}/favorites`, newFavoriteProductData)
      product.favoriteId = data.id
    } else {
      product.isFavorite = false
      await axios.delete(`${API_URL}/favorites/${product.favoriteId}`)
      product.favoriteId = null
    }
  } catch (err) {
    console.error(err)
  }
}

watch(filters, fetchProducts)

const isLoadingOrder = ref(false)

const totalPrice = computed(() => cart.value.reduce((acc, product) => acc + product.price, 0))

const discount = 10
const discountPrice = computed(() => Math.round((totalPrice.value * discount) / 100))
const totalPriceAfterDiscount = computed(() => totalPrice.value - discountPrice.value)

const isDrawerOpen = ref(false)

const openDrawer = () => (isDrawerOpen.value = true)
const closeDrawer = () => (isDrawerOpen.value = false)

const addToCart = (product: Product) => {
  cart.value.push(product)
  product.isAdded = true
}

const removeFromCart = (product: Product) => {
  cart.value.splice(cart.value.indexOf(product), 1)
  product.isAdded = false
}

const onClickAddCard = (product: Product) => {
  if (!product.isAdded) addToCart(product)
  else removeFromCart(product)
}

const createOrder = async () => {
  try {
    isLoadingOrder.value = true
    const { data } = await axios.post(`${API_URL}/orders`, {
      products: cart.value,
      totalPrice: totalPrice.value,
      discount: discount,
      discountPrice: discountPrice.value,
      totalPriceAfterDiscount: totalPriceAfterDiscount.value
    })

    cart.value = []

    return data
  } catch (error) {
    console.error('Error creating order:', error)
  } finally {
    isLoadingOrder.value = false
  }
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  {
    deep: true
  }
)

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

provide('addToFavorite', addToFavorite)

provide<Cart>('cart', {
  cart,
  totalPrice,
  discountPrice,
  totalPriceAfterDiscount,
  isLoadingOrder,
  addToCart,
  removeFromCart,
  onClickAddCard,
  createOrder,
  openDrawer,
  closeDrawer
})

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []
  console.log('cart', cart.value)

  await fetchProducts()
  await fetchFavorites()

  products.value = products.value.map((product) => ({
    ...product,
    isAdded: cart.value.some((cartItem) => cartItem.id === product.id)
  }))
})
</script>

<template>
  <Drawer v-if="isDrawerOpen" />
  <div class="page">
    <AppHeader @open-drawer="openDrawer" :total-price="totalPrice" />
    <Products
      :products="products"
      :api-url="API_URL"
      @on-change-select="onChangeSelect"
      @on-change-search-input="onChangeSearchInput"
    />
  </div>
</template>

<style lang="scss">
.page {
  width: 80%;
  margin: 56px auto;
  background: var(--color-page-background);
  border-radius: $border-radius-page;
  box-shadow: $shadow-sm, $shadow-xl;
}
</style>
