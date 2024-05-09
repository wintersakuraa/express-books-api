import joi from 'joi'

export class BookValidator {
  static title = joi.string().trim()
  static author = joi.string().trim()
  static year = joi.number().integer().min(1).max(new Date().getFullYear())
  static genre = joi.string().trim()

  static create = joi.object({
    title: this.title.required(),
    author: this.author.required(),
    year: this.year.required(),
    genre: this.genre.required(),
  })

  static update = joi.object({
    title: this.title,
    author: this.author,
    year: this.year,
    genre: this.genre,
  })

  static queryParams = joi.object({
    title: this.title,
    author: this.author,
    startYear: this.year,
    endYear: this.year,
    genre: joi
      .alternatives()
      .try(joi.array().items(joi.string().trim()), joi.string().trim()),
  })
}
