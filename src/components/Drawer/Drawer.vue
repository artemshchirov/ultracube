<script setup>
import Overlay from '@/components/Overlay.vue'
import DrawerHeader from '@/components/Drawer/DrawerHeader.vue'
import Cart from '@/components/Cart/Cart.vue'
</script>

<template>
  <Overlay />
  <div class="drawer">
    <DrawerHeader />
    <Cart />
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
  padding: 40px;
}
</style>
