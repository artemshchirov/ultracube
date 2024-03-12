import type { Product } from './product'

export interface Favorite {
  id: number
  parentId: number
}

export type AddToFavoriteFunction = (product: Product) => Promise<void>
