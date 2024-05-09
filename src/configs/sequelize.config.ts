import path from 'path'
import { Dialect } from 'sequelize'
import { SequelizeOptions } from 'sequelize-typescript'

export const sequelizeConfig: SequelizeOptions = {
  dialect: process.env.DB_DIALECT as Dialect,
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  models: [path.join(__dirname, '..', 'models')],
  modelMatch: (filename: string, member: string) => {
    return (
      filename.substring(0, filename.indexOf('.model')) === member.toLowerCase()
    )
  },
}
