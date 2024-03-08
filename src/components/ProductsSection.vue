<script setup lang="ts">
import CardList from './Card/CardList.vue'
</script>

<template>
  <section class="products">
    <div class="products__header">
      <h2 class="products__title">All cubes</h2>

      <div class="products__settings">
        <select class="products__sort">
          <option value="name">Name</option>
          <option value="price_asc">Price (Low to High)</option>
          <option value="price_desc">Price (High to Low)</option>
        </select>

        <div class="products__search">
          <img class="products__search-icon" src="/search.svg" alt="Search" />
          <input class="products__search-input" placeholder="Search..." />
        </div>
      </div>
    </div>

    <CardList />
  </section>
</template>

<style scoped lang="scss">
.products {
  padding: 40px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: 1.875rem; /* 30px */
    line-height: 2.25rem; /* 36px */
    padding-bottom: 32px;
  }

  &__settings {
    display: flex;
    gap: 16px;
  }

  &__sort {
    border: 1px solid var(--color-input-border);
    border-radius: $input-border-radius;
    padding: 8px 12px;
    outline: none;
  }

  &__search {
    position: relative;

    &-icon {
      position: absolute;
      left: 16px;
      top: 9.5px;

      z-index: 1;
    }

    &-input {
      border: 1px solid var(--color-input-border);
      border-radius: $input-border-radius;
      padding: 9px 16px 8px 44px;
      outline: none;

      &:focus {
        border-color: var(--color-input-border-focus);
      }
    }
  }
}
</style>
./CardItem.vue
