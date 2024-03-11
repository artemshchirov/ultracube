<script setup lang="ts">
import type { Cart } from '@/App.vue'
import { inject } from 'vue'

const { totalPrice, discountPrice } = inject('cart') as Cart
</script>

<template>
  <footer class="drawer-footer">
    <div class="drawer-footer__container">
      <div class="drawer-footer__price">
        <span class="drawer-footer__label">Total:</span>
        <div class="drawer-footer__separator" />
        <b class="drawer-footer__amount">{{ totalPrice }}₪</b>
      </div>
      <div class="drawer-footer__price">
        <span class="drawer-footer__label">Discount 10%:</span>
        <div class="drawer-footer__separator" />
        <b class="drawer-footer__amount">{{ discountPrice }}₪</b>
      </div>
    </div>

    <button disabled class="drawer-footer__checkout-btn">
      Checkout ({{ totalPrice - discountPrice }}₪)
    </button>
  </footer>
</template>

<style scoped lang="scss">
.drawer-footer {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 28px 0;

  &__container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__price {
    display: flex;
    gap: 8px;
  }

  &__separator {
    flex: 1 1 0%;
    border-bottom: 1px dashed var(--color-separator);
  }

  &__checkout-btn {
    @include transition-default;
    background: var(--color-primary);
    width: 100%;
    border-radius: 12px;
    padding: 12px 0;
    border: none;
    color: var(--color-text-light);
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
}
</style>
