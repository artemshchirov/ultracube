import type { Product } from './product'

export interface Favorite {
  id: number
  parentId: number
}

export interface AddToFavoriteFunction {
  (obj: Product): void
}
