<script setup lang="ts">
interface Props {
  totalPrice: number
}

defineProps<Readonly<Props>>()
const LOGO_URL =
  'https://ik.imagekit.io/webbuilder/rubiks-cubes-shop/logo/img_4462.800x800w_4BOkccY30.jpg'

const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header class="header">
    <router-link to="/" class="link">
      <div class="header__logo">
        <img :src="LOGO_URL" alt="Logo" class="logo" />
        <div class="header__branding">
          <h2 class="header__title">Ultracube</h2>
          <p class="header__tagline">Shop of the best cubes</p>
        </div>
      </div>
    </router-link>

    <nav class="nav">
      <ul class="nav__list">
        <li class="nav__item" @click="() => emit('openDrawer')">
          <img src="/cart.svg" alt="Cart" class="nav__icon" />
          <b class="nav__item-text">{{ totalPrice }}₪</b>
        </li>
        <router-link to="/favorites" class="link">
          <li class="nav__item">
            <img src="/heart.svg" alt="Favorites" class="nav__icon" /><span class="nav__item-text"
              >Favorites</span
            >
          </li>
        </router-link>
        <li class="nav__item">
          <img src="/profile.svg" alt="Profile" class="nav__icon" /><span class="nav__item-text"
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

  &__logo {
    display: flex;
    align-items: center;
    gap: 16px;
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

.logo {
  width: 40px;
  height: 40px;
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
