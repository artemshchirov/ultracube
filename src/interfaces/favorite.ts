import type { Product } from './product'

export interface Favorite {
  id: number
  product_id: number
}

export type AddToFavoriteFunction = (product: Product) => Promise<void>
