<script setup lang="ts">
import { ref, provide, computed, watch } from 'vue'
import Drawer from '@/components/Drawer/Drawer.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import type { Product } from '@/interfaces/product'
import type { Cart } from '@/interfaces/cart'

/* Start of Cart */
const cart = ref<Product[]>([])

const isDrawerOpen = ref(false)

const openDrawer = () => (isDrawerOpen.value = true)
const closeDrawer = () => (isDrawerOpen.value = false)

const totalPrice = computed(() => cart.value.reduce((acc, product) => acc + product.price, 0))

const addToCart = (product: Product) => {
  cart.value.push(product)
  product.isAdded = true
}

const removeFromCart = (product: Product) => {
  const index = cart.value.findIndex((item) => item.id === product.id)
  if (index !== -1) {
    cart.value.splice(index, 1)
    product.isAdded = false
  }
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
  addToCart,
  removeFromCart,
  openDrawer,
  closeDrawer
})
</script>

<template>
  <Drawer v-if="isDrawerOpen" />
  <div class="page">
    <AppHeader @open-drawer="openDrawer" :total-price="totalPrice" />

    <div class="page__container">
      <router-view />
    </div>
  </div>
  <AppFooter />
</template>

<style lang="scss">
.page {
  width: 80%;
  margin: 80px auto;
  background: var(--color-page-background);
  border-radius: $border-radius-page;
  box-shadow: $shadow-sm, $shadow-xl;

  &__container {
    padding: 45px 60px;
  }
}

.link {
  text-decoration: none;
  cursor: pointer;
}

.button {
  @include transition-default;
  background: var(--color-primary);
  width: 100%;
  border-radius: $border-radius-button;
  padding: 12px 0;
  border: none;
  color: var(--color-text-white);
  cursor: pointer;

  &:hover {
    background: var(--color-primary-hover);
  }

  &:active {
    background: var(--color-primary-active);
  }

  &:disabled {
    background: var(--color-disabled);
    cursor: not-allowed;
  }
}
</style>
