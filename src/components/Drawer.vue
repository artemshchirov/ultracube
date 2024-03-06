<script setup>
import Overlay from './Overlay.vue'
import DrawerHeader from './DrawerHeader.vue'
import Cart from './Cart.vue'
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
