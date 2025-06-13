import type { ReactNode, ElementType } from "react";

// Typography 컴포넌트 타입
export type TypographyVariant =
  | "title1"
  | "title2"
  | "title3"
  | "h3-bold"
  | "body1"
  | "body2"
  | "body2-bold"
  | "caption"
  | "small"
  | "search-result"
  | "book-detail-title"
  | "book-detail-contents"
  | "book-detail-price-title"
  | "book-detail-strike-price";

export interface TypographyProps {
  variant: TypographyVariant;
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

// BookListItem 컴포넌트 타입
export interface BookListItemProps {
  isbn: string;
  title: string;
  author: string;
  thumbnail: string;
  price: number;
  url: string;
  onToggleExpand: () => void;
  onFavoriteClick: () => void;
  status: string;
}

// BookListItemDetail 컴포넌트 타입
export interface BookListItemDetailProps
  extends Omit<BookListItemProps, "author"> {
  author: string;
  salePrice?: number;
  contents: string;
}

// SearchDetailModal 컴포넌트 타입
export interface SearchDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (searchType: string, keyword: string) => void;
}

// ResultCount 컴포넌트 타입
export interface ResultCountProps {
  count: number;
}

// EmptyResult 컴포넌트 타입
export interface EmptyResultProps {
  message?: string;
}
