import type { Ref } from 'vue'
import type { Product } from './product'

export interface Cart {
  cart: Ref<Product[]>
  totalPrice: Ref<number>
  discountPrice: Ref<number>
  totalPriceAfterDiscount: Ref<number>
  isLoadingOrder: Ref<boolean>
  onClickAddCard: (product: Product) => void
  addToCart: (product: Product) => void
  removeFromCart: (product: Product) => void
  createOrder: () => Promise<void>
  openDrawer: () => void
  closeDrawer: () => void
}
