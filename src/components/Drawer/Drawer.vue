<script setup lang="ts">
import { inject } from 'vue'

import Overlay from '@/components/Overlay.vue'
import DrawerHeader from '@/components/Drawer/DrawerHeader.vue'
import CartList from '@/components/Cart/CartList.vue'
import DrawerFooter from '@/components/Drawer/DrawerFooter.vue'
import InfoBlock from '../InfoBlock.vue'
import type { Cart } from '@/App.vue'

const { totalPrice } = inject('cart') as Cart
</script>

<template>
  <Overlay />
  <div class="drawer">
    <DrawerHeader />

    <InfoBlock
      v-if="!totalPrice"
      title="Cart is empty"
      description="Add at least one cube to make an order"
      imageUrl="/package-icon.png"
    />

    <div v-else>
      <CartList />
      <DrawerFooter :totalPrice="totalPrice" />
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
}
</style>
