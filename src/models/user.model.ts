import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'

import { Role } from './role.model'

@Table({ tableName: 'users' })
export class User extends Model {
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
  })
  username: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  refreshToken?: string

  @ForeignKey(() => Role)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  roleId: string

  @BelongsTo(() => Role)
  role: Role
}
