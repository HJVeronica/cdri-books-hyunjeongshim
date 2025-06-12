// 카카오 도서 검색 API 응답 타입
export interface KakaoBookSearchResponse {
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
  documents: KakaoBook[];
}

// 카카오 도서 정보
export interface KakaoBook {
  title: string;
  contents: string;
  url: string;
  isbn: string;
  datetime: string;
  authors: string[];
  publisher: string;
  translators: string[];
  price: number;
  sale_price: number;
  thumbnail: string;
  status: string;
}

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
