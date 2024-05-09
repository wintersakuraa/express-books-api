type FilterOptions = Record<string, any>

interface PaginationQuery {
  page?: number
  limit?: number
}

interface PaginationResponse<T> {
  total: number
  results: T
}

export { FilterOptions, PaginationQuery, PaginationResponse }
