<script setup lang="ts">
import { API_URL, DISCOUNT_PERCENTAGE } from '@/constants'
import type { Cart } from '@/interfaces/cart'
import axios from 'axios'
import { computed, inject, ref } from 'vue'

interface Props {
  totalPrice: number
}
const { totalPrice } = defineProps<Readonly<Props>>()
const emit = defineEmits(['update:orderId'])

const { cart } = inject('cart') as Cart
const isLoadingOrder = ref(false)

const discountPrice = computed(() => Math.round((totalPrice * DISCOUNT_PERCENTAGE) / 100))
const totalPriceAfterDiscount = computed(() => totalPrice - discountPrice.value)

const createOrder = async () => {
  try {
    isLoadingOrder.value = true
    const { data: cartData } = await axios.post(`${API_URL}/orders`, {
      products: cart.value,
      totalPrice: totalPrice,
      discount: DISCOUNT_PERCENTAGE,
      discountPrice: discountPrice.value,
      totalPriceAfterDiscount: totalPriceAfterDiscount.value
    })

    cart.value = []

    emit('update:orderId', cartData.id)

    return cartData
  } catch (error) {
    console.error('Error creating order:', error)
  } finally {
    isLoadingOrder.value = false
  }
}

const isButtonDisabled = computed(() => !totalPriceAfterDiscount.value || isLoadingOrder.value)
</script>

<template>
  <footer class="drawer-footer">
    <div class="drawer-footer__container">
      <div class="drawer-footer__price">
        <span class="drawer-footer__label">Price:</span>
        <div class="drawer-footer__separator" />
        <p class="drawer-footer__amount">{{ totalPrice }}₪</p>
      </div>
      <div class="drawer-footer__price">
        <span class="drawer-footer__label">Discount 10%:</span>
        <div class="drawer-footer__separator" />
        <p class="drawer-footer__amount">{{ discountPrice }}₪</p>
      </div>
      <div class="drawer-footer__price drawer-footer__price_total">
        <span class="drawer-footer__label">Total Price:</span>
        <div class="drawer-footer__separator" />
        <b class="drawer-footer__amount">{{ totalPriceAfterDiscount }}₪</b>
      </div>
    </div>

    <button @click="createOrder" :disabled="isButtonDisabled" class="button">
      Checkout {{ totalPriceAfterDiscount ? `(${totalPriceAfterDiscount}₪)` : '' }}
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
    gap: 20px;
  }

  &__price {
    display: flex;
    gap: 8px;
    line-height: 1;

    &_total {
      margin-top: 8px;
    }
  }

  &__separator {
    flex: 1 1 0%;
    border-bottom: 1px dashed var(--color-separator);
  }
}
</style>
