<script setup lang="ts">
import CartItem from '@/components/Cart/CartItem.vue'
</script>

<template>
  <ul class="cart-list">
    <CartItem />
    <CartItem />
    <CartItem />
    <CartItem />
  </ul>
</template>

<style lang="scss">
.cart-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
