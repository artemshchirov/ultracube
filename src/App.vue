<script setup lang="ts">
import { ref, provide, type Ref, computed } from 'vue'

import Drawer from '@/components/Drawer/Drawer.vue'
import AppHeader from '@/components/AppHeader.vue'
import Products from '@/components/Products.vue'
import type { Product } from './interfaces/product'
import axios from 'axios'

export interface Cart {
  cart: Ref<Product[]>
  totalPrice: Ref<number>
  discountPrice: Ref<number>
  totalPriceAfterDiscount: Ref<number>
  isLoadingOrder: Ref<boolean>
  onClickAddCard: (product: Product) => void
  addToCart: (product: Product) => void
  removeFromCart: (product: Product) => void
  createOrder: () => Promise<void>
  openDrawer: () => void
  closeDrawer: () => void
}

const API_URL = 'https://12055c66f459ccac.mokky.dev'

const cart = ref<Product[]>([])

const products = ref<Product[]>([])

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

    cart.value.forEach((product) => (product.isAdded = false))

    cart.value = []

    return data
  } catch (error) {
    console.error('Error creating order:', error)
  } finally {
    isLoadingOrder.value = false
  }
}

const onClickAddCard = (product: Product) => {
  if (!product.isAdded) addToCart(product)
  else removeFromCart(product)
}

// TODO: Save cart in localStorage
// watch(cart, () => {
//   localStorage.setItem('cart', JSON.stringify(cart.value))
// })

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

provide('API_URL', API_URL)
</script>

<template>
  <Drawer v-if="isDrawerOpen" />
  <div class="page">
    <AppHeader @open-drawer="openDrawer" :total-price="totalPrice" />
    <Products :products="products" :api-url="API_URL" />
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
