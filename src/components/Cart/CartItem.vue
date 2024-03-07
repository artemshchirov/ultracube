<script setup lang="ts"></script>

<template>
  <li class="cart-item">
    <article class="cart-item__card">
      <img src="/sneakers/sneakers-1.jpg" alt="Sneaker" class="cart-item__image" />

      <div class="cart-item__container">
        <p class="cart-item__title">Product 1</p>

        <div class="cart-item__price">
          <b class="cart-item__price-value">42₪</b>
          <img src="/close.svg" alt="Plus" class="cart-item__price-close-icon" />
        </div>
      </div>
    </article>
  </li>
</template>

<style lang="scss">
.cart-item {
  padding: 16px;
  border-radius: 12px;
  border: 1px solid var(--color-product-card-border);

  &__card {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__image {
    max-width: 64px;
    max-height: 64px;
  }

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    gap: 4px;
  }

  &__price {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-close-icon {
      @include transition-default;
      cursor: pointer;
      opacity: 0.3;

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
