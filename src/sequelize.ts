import { Sequelize } from 'sequelize-typescript'

import { sequelizeConfig } from './configs'

export const sequelize = new Sequelize(sequelizeConfig)
