<script setup lang="ts">
import type { Product } from '@/interfaces/product'
import CardList from './Card/CardList.vue'

defineProps<{
  products: Product[]
  apiUrl: string
}>()

const emit = defineEmits(['onChangeSelect', 'onChangeSearchInput'])
</script>

<template>
  <section class="products">
    <div class="products__header">
      <h2 class="products__title">All cubes</h2>

      <div class="products__settings">
        <select @change="($event) => emit('onChangeSelect', $event)" class="products__sort">
          <option value="title">Name</option>
          <option value="price">Price (Low to High)</option>
          <option value="-price">Price (High to Low)</option>
        </select>

        <div class="products__search">
          <img class="products__search-icon" src="/search.svg" alt="Search" />
          <input
            @input="($event) => emit('onChangeSearchInput', $event)"
            class="products__search-input"
            placeholder="Search..."
          />
        </div>
      </div>
    </div>

    <CardList :products="products" />
  </section>
</template>

<style scoped lang="scss">
.products {
  padding: 40px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
  }

  &__title {
    font-size: 1.875rem; /* 30px */
    line-height: 2.25rem; /* 36px */
  }

  &__settings {
    display: flex;
    gap: 16px;
  }

  &__sort {
    border: 1px solid var(--color-input-border);
    border-radius: $border-radius-input;
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
      border-radius: $border-radius-input;
      padding: 9px 16px 8px 44px;
      outline: none;

      &:focus {
        border-color: var(--color-input-border-focus);
      }
    }
  }
}
</style>
