<script setup lang="ts">
import { inject } from 'vue'
import CartItem from '@/components/Cart/CartItem.vue'
import type { Cart } from '@/interfaces/cart'

const { cart, removeFromCart } = inject('cart') as Cart
</script>

<template>
  <ul class="cart-list" v-auto-animate>
    <CartItem
      v-for="product in cart"
      :key="product.id"
      v-bind="product"
      @on-click-remove="() => removeFromCart(product)"
    />
  </ul>
</template>

<style lang="scss">
.cart-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
  // max-height: 100%;
  // overflow: auto;
}
</style>
