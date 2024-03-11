<script setup lang="ts">
import { inject } from 'vue'
import CartItem from '@/components/Cart/CartItem.vue'
import type { CartActions } from '@/App.vue'

const { cart } = inject('cart') as CartActions
</script>

<template>
  <ul class="cart-list">
    <CartItem v-for="item in cart" :key="item.id" v-bind="item" />
  </ul>
</template>

<style lang="scss">
.cart-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
