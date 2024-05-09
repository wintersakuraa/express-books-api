import { NextFunction, Request, Response } from 'express'

import { bookService } from '../services'

class BookController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const books = await bookService.getAll(req.query)
      res.json(books)
    } catch (e) {
      next(e)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const book = await bookService.create(req.body)
      res.status(201).json(book)
    } catch (e) {
      next(e)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const book = await bookService.getById(req.params.id)
      res.json(book)
    } catch (e) {
      next(e)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedBook = await bookService.update(req.params.id, req.body)
      res.json(updatedBook)
    } catch (e) {
      next(e)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await bookService.delete(req.params.id)
      res.status(204).send()
    } catch (e) {
      next(e)
    }
  }
}

export const bookController = new BookController()
