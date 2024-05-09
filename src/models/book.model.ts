import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({ tableName: 'books' })
export class Book extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    validate: {
      isUUID: 4,
    },
  })
  id: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  })
  title: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  })
  author: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 1,
    },
  })
  year: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  genre: string
}
