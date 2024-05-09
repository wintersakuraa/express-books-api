import { WhereOptions } from 'sequelize'

import { Book } from '../models/book.model'
import { CreateBookDto, UpdateBookDto } from '../types/book.types'
import { PaginationResponse } from '../types/common.types'

class BookRepository {
  async getAll(
    limit: number,
    pageOffset: number,
    where: WhereOptions<Book>,
  ): Promise<PaginationResponse<Book[]>> {
    const { count, rows } = await Book.findAndCountAll({
      limit,
      offset: pageOffset,
      where,
    })

    return {
      total: count,
      results: rows,
    }
  }

  async create(dto: CreateBookDto): Promise<Book> {
    return Book.create({ ...dto })
  }

  async getById(id: string): Promise<Book> {
    return Book.findByPk(id)
  }

  async update(id: string, dto: UpdateBookDto): Promise<Book> {
    await Book.update({ ...dto }, { where: { id } })
    return Book.findByPk(id)
  }

  async delete(id: string): Promise<void> {
    await Book.destroy({ where: { id } })
  }
}

export const bookRespository = new BookRepository()
