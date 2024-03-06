<script setup>
import CloseIcon from '@/components/icons/CloseIcon.vue'
</script>

<template>
  <div class="drawer-header">
    <CloseIcon />
    <h2 class="drawer-header__title">Shopping cart</h2>
  </div>
</template>

<style scoped lang="scss">
.drawer-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

.drawer-header__title {
  font-size: 24px;
  font-weight: 700;
}
</style>
