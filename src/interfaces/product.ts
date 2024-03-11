import type { Card } from './card'

export type Product = Card & {
  isFavorite: boolean
  favoriteId?: number | null
  isAdded?: boolean
  onClickFavorite: (payload: MouseEvent) => void
  onClickAdd?: (payload: MouseEvent) => void
}
