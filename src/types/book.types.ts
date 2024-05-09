import { PaginationQuery } from './common.types'

interface CreateBookDto {
  title: string
  author: string
  year: number
  genre: string
}

type UpdateBookDto = Partial<CreateBookDto>

interface BookQuery extends PaginationQuery {
  title?: string
  author?: string | string[]
  startYear?: number
  endYear?: number
  genre?: string | string[]
}

export { BookQuery, CreateBookDto, UpdateBookDto }
