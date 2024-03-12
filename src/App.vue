<script setup lang="ts">
import { ref, provide, computed, watch } from 'vue'
import axios from 'axios'
import Drawer from '@/components/Drawer/Drawer.vue'
import AppHeader from '@/components/AppHeader.vue'
import Home from '@/pages/Home.vue'
import type { Product } from './interfaces/product'
import type { Cart } from './interfaces/cart'

const API_URL = 'https://12055c66f459ccac.mokky.dev'

/* Start of Cart */
const cart = ref<Product[]>([])

const isDrawerOpen = ref(false)
const isLoadingOrder = ref(false)

const openDrawer = () => (isDrawerOpen.value = true)
const closeDrawer = () => (isDrawerOpen.value = false)

const totalPrice = computed(() => cart.value.reduce((acc, product) => acc + product.price, 0))
const discount = 10
const discountPrice = computed(() => Math.round((totalPrice.value * discount) / 100))
const totalPriceAfterDiscount = computed(() => totalPrice.value - discountPrice.value)

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

const addToCart = (product: Product) => {
  cart.value.push(product)
  product.isAdded = true
}

const removeFromCart = (product: Product) => {
  cart.value.splice(cart.value.indexOf(product), 1)
  product.isAdded = false
}

/* End of Cart */

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide<Partial<Cart>>('cart', {
  cart,
  totalPrice,
  discountPrice,
  totalPriceAfterDiscount,
  isLoadingOrder,
  addToCart,
  removeFromCart,
  createOrder,
  openDrawer,
  closeDrawer
})
</script>

<template>
  <Drawer v-if="isDrawerOpen" />
  <div class="page">
    <AppHeader @open-drawer="openDrawer" :total-price="totalPrice" />

    <Home :api-url="API_URL" />
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
