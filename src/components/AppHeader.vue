<script setup lang="ts">
import Logo from '@/components/Logo.vue'

interface Props {
  totalPrice: number
}

defineProps<Readonly<Props>>()

const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header class="header">
    <Logo />

    <nav class="nav">
      <ul class="nav__list">
        <li class="nav__item" @click="() => emit('openDrawer')">
          <img src="/assets/cart.svg" alt="Cart" class="nav__icon" />
          <b class="nav__item-text">{{ totalPrice }}₪</b>
        </li>
        <router-link to="/favorites" class="link">
          <li class="nav__item">
            <img src="/assets/heart.svg" alt="Favorites" class="nav__icon" /><span
              class="nav__item-text"
              >Favorites</span
            >
          </li>
        </router-link>
        <li class="nav__item">
          <img src="/assets/profile.svg" alt="Profile" class="nav__icon" /><span
            class="nav__item-text"
            >Profile</span
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-separator);
  padding: 32px 40px;
}

.nav {
  display: flex;

  &__list {
    display: flex;
    align-items: center;
    gap: 32px;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    &-text {
      color: var(--color-text-nav);

      &:hover {
        color: var(--color-text);
      }
    }
  }
}
</style>
