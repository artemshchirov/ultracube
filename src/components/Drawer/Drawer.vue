<script setup lang="ts">
import { inject, ref } from 'vue'

import Overlay from '@/components/Overlay.vue'
import DrawerHeader from '@/components/Drawer/DrawerHeader.vue'
import CartList from '@/components/Cart/CartList.vue'
import DrawerFooter from '@/components/Drawer/DrawerFooter.vue'
import InfoBlock from '../InfoBlock.vue'
import type { Cart } from '@/interfaces/cart'

const { totalPrice } = inject('cart') as Cart
const orderId = ref(null)
</script>

<template>
  <Overlay />
  <div class="drawer">
    <DrawerHeader />

    <InfoBlock
      v-if="!totalPrice && !orderId"
      title="Cart is empty"
      description="Add at least one cube to make an order"
      imageUrl="/assets/package-icon.png"
    />

    <InfoBlock
      v-if="orderId"
      title="Order placed"
      :description="`Your order #${orderId} will soon be handed over to the courier delivery`"
      imageUrl="/assets/order-success-icon.png"
    />

    <div v-else class="drawer__container">
      <CartList />
      <DrawerFooter :total-price="totalPrice" @update:orderId="orderId = $event" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.drawer {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 384px;
  background: white;
  z-index: 20;
  padding: 30px;

  &__container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
