<script setup lang="ts">
import { LOGO_URL } from '@/constants'
</script>

<template>
  <router-link to="/" class="link">
    <div class="logo">
      <img :src="LOGO_URL" alt="Logo" class="logo__image" />
      <div>
        <h2 class="logo__title">Ultracube</h2>
        <p class="logo__tagline">Shop of the best cubes</p>
      </div>
    </div>
  </router-link>
</template>

<style scoped lang="scss">
.link {
  color: var(--color-text);
}

.logo {
  display: flex;
  align-items: center;
  gap: 16px;

  &__image {
    width: 40px;
    height: 40px;
  }

  &__title {
    font-size: 1.25rem; /* 20px */
    line-height: 1.75rem; /* 28px */
    font-weight: 600;
    text-transform: uppercase;
  }

  &__tagline {
    color: var(--color-text-secondary);
  }
}
</style>
