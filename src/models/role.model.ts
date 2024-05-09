import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'

import { User } from './user.model'

@Table({ tableName: 'roles' })
export class Role extends Model {
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
    unique: true,
    validate: {
      isLowercase: true,
      notEmpty: true,
      notNull: true,
    },
  })
  name: string

  @HasMany(() => User)
  players: User[]
}
