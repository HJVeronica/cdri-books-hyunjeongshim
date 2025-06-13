// 앱에서 사용할 도서 타입
export interface Book {
  isbn: string;
  title: string;
  authors: string[];
  publisher: string;
  thumbnail: string;
  price: number;
  salePrice?: number;
  url: string;
  contents: string;
  status: string;
}

// 검색 파라미터
export interface BookSearchParams {
  query: string;
  sort?: "accuracy" | "recency";
  page?: number;
  size?: number;
  target?: "title" | "publisher" | "person";
}
