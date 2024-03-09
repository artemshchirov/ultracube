import type { Product } from './product'

export type Card = Product & {
  isFavorite: boolean
  favoriteId: number | null
  isAddedToCart: boolean
}
