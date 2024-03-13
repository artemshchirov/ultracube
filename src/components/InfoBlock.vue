<script setup lang="ts">
import type { Cart } from '@/interfaces/cart'
import { inject } from 'vue'

interface Props {
  title: string
  description: string
  imageUrl: string
}

defineProps<Readonly<Props>>()

const { closeDrawer } = inject('cart') as Cart
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
    <button @click="closeDrawer" class="button info__back-btn">Cancel</button>
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
    width: 100px;
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

  &__back-btn {
    margin-top: 40px;
    max-width: 245px;
  }
}
</style>
