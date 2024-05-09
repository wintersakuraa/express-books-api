import { Op } from 'sequelize'

import { NotFoundError } from '../common/errors'
import { getPageOffset, isObjectEmpty } from '../common/helpers/util.helpers'
import { Book } from '../models/book.model'
import { bookRespository } from '../repositories'
import { BookQuery, CreateBookDto, UpdateBookDto } from '../types/book.types'
import { FilterOptions, PaginationResponse } from '../types/common.types'

class BookService {
  async getAll(query: BookQuery): Promise<PaginationResponse<Book[]>> {
    const { page, limit, title, author, startYear, endYear, genre } = query

    const pageOffset = getPageOffset(page, limit)
    const filterOptions: FilterOptions = {}

    if (title) {
      filterOptions.title = { [Op.like]: `%${title}%` }
    }

    if (author) {
      filterOptions.author = author
    }

    if (startYear) {
      filterOptions.year = { [Op.gte]: startYear }
    }

    if (endYear) {
      filterOptions.year = { ...filterOptions.year, [Op.lte]: endYear }
    }

    if (genre) {
      filterOptions.genre =
        Array.isArray(genre) && genre.length > 0 ? { [Op.in]: genre } : genre
    }

    const where = {
      ...(!isObjectEmpty(filterOptions) && { [Op.and]: filterOptions }),
    }

    return bookRespository.getAll(limit, pageOffset, where)
  }

  async create(dto: CreateBookDto): Promise<Book> {
    return bookRespository.create(dto)
  }

  async getById(id: string): Promise<Book> {
    const book = await bookRespository.getById(id)
    if (!book) {
      throw new NotFoundError('Book')
    }

    return book
  }

  async update(id: string, dto: UpdateBookDto): Promise<Book> {
    return bookRespository.update(id, dto)
  }

  async delete(id: string): Promise<void> {
    return bookRespository.delete(id)
  }
}

export const bookService = new BookService()
