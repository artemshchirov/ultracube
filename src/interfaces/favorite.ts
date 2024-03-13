import type { Product } from './product'

export interface Favorite {
  id: number
  product_id: number
}

export interface FavoriteResponse {
  id: number
  product: Product
}

export type AddToFavoriteFunction = (product: Product) => Promise<void>
