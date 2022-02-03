export interface PaginatedResponse<T> {
  page?: number;
  totalPages?: number;
  totalItems?: number;
  data?: T[];
}
