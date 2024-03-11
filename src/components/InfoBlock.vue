<script setup lang="ts">
import { inject } from 'vue'

import type { Cart } from '@/App.vue'

defineProps<{
  title: string
  description: string
  imageUrl: string
}>()

const closeDrawer = (inject('cart') as Cart).closeDrawer
</script>

<template>
  <div class="info">
    <div class="info__container">
      <img class="info__image" :src="imageUrl" alt="Info" />
      <div class="info__text">
        <h2 class="info__title">{{ title }}</h2>
        <p class="info__description">{{ description }}</p>
      </div>
    </div>
    <button @click="closeDrawer" class="back-btn">Cancel</button>
  </div>
</template>

<style scoped lang="scss">
.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  &__image {
    width: 80px;
    height: 80px;
  }

  &__text {
    font-weight: 500;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  &__title {
    font-size: 1.5rem; /* 24px */
    line-height: 2rem; /* 32px */
  }

  &__description {
    max-width: 170px;
    color: var(--color-text-secondary);
  }

  .back-btn {
    @include transition-default;
    background: var(--color-primary);
    width: 100%;
    border-radius: $border-radius-button;
    padding: 12px 0;
    border: none;
    color: var(--color-text-white);
    cursor: pointer;
    margin-top: 40px;
    max-width: 245px;

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
