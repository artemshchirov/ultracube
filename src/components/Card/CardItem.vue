<script setup lang="ts">
import type { Product } from '@/interfaces/product'

defineProps<Partial<Product>>()
</script>

<template>
  <article class="product-card">
    <div class="product-card__container">
      <img
        v-if="onClickFavorite"
        @click="onClickFavorite"
        :src="isFavorite ? '/like-filled.svg' : '/like-empty.svg'"
        alt="Like empty"
        class="product-card__like-icon"
      />
      <img :src="imageUrl" :alt="title" class="product-card__image" />
      <p class="product-card__title">{{ title }}</p>
    </div>
    <div class="product-card__footer">
      <div class="product-card__price">
        <span class="product-card__price-label">Price:</span>
        <b class="product-card__price-value">{{ price }}₪</b>
      </div>

      <img
        v-if="onClickAdd"
        @click="onClickAdd"
        :src="isAdded ? '/checked.svg' : '/plus.svg'"
        alt="Plus"
        class="product-card__add-icon"
      />
    </div>
  </article>
</template>

<style scoped lang="scss">
.product-card {
  @include transition-default;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  position: relative;
  padding: 32px;
  border: 1px solid var(--color-product-card-border);
  border-radius: $border-radius-card;
  background: var(--color-product-card-background);

  &:hover {
    transform: translateY(-0.5rem);
    box-shadow: $shadow-xl;
  }

  &__image {
    max-width: 100%;
  }

  &__like-icon {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    cursor: pointer;
  }

  &__title {
    margin-top: 14px;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    margin-top: 14px;
  }

  &__price {
    display: flex;
    flex-direction: column;
    gap: 2px;

    &-label {
      color: var(--color-text-secondary);
    }
  }

  &__add-icon {
    cursor: pointer;
  }
}
</style>
