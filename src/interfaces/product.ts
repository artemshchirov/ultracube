import type { Card } from './card'

export type Product = Card & {
  isFavorite: boolean
  favoriteId?: number | null
  isAddedToCart?: boolean
  onClickFavorite: (payload: MouseEvent) => void
}
