export interface FavoriteBook {
  isbn: string;
  title: string;
  authors: string[];
  thumbnail: string;
  publisher: string;
  price: number;
  sale_price: number;
  url: string;
  contents: string;
}

export const STORAGE_KEYS = {
  SEARCH_HISTORY: "cdri-books-search-history",
  FAVORITES: "cdri-books-favorites",
} as const;
