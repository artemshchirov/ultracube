<script setup lang="ts">
import { ref, provide, type Ref, computed } from 'vue'

import Drawer from '@/components/Drawer/Drawer.vue'
import AppHeader from '@/components/AppHeader.vue'
import Products from '@/components/Products.vue'
import type { Product } from './interfaces/product'

export interface Cart {
  cart: Ref<Product[]>
  totalPrice: Ref<number>
  discountPrice: Ref<number>
  onClickAddCard: (product: Product) => void
  addToCart: (product: Product) => void
  removeFromCart: (product: Product) => void
  openDrawer: () => void
  closeDrawer: () => void
}

const cart = ref<Product[]>([])

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

const isDrawerOpen = ref(false)

const openDrawer = () => (isDrawerOpen.value = true)
const closeDrawer = () => (isDrawerOpen.value = false)

const totalPrice = computed(() => cart.value.reduce((acc, product) => acc + product.price, 0))

const discount = 10
const discountPrice = computed(() => Math.round((totalPrice.value * discount) / 100))

provide<Cart>('cart', {
  cart,
  totalPrice,
  discountPrice,
  addToCart,
  removeFromCart,
  onClickAddCard,
  openDrawer,
  closeDrawer
})
</script>

<template>
  <Drawer v-if="isDrawerOpen" />
  <div class="page">
    <AppHeader @open-drawer="openDrawer" :total-price="totalPrice" />
    <Products />
  </div>
</template>

<style lang="scss">
.page {
  width: 80%;
  margin: 56px auto;
  background: var(--color-page-background);
  border-radius: 24px;
  box-shadow: $shadow-sm, $shadow-xl;
}
</style>
