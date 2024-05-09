'use strict'

require('dotenv').config()
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const roleId = uuidv4()
    const adminId = uuidv4()
    const passwordHash = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      Number(process.env.SECRET_SALT),
    )

    await queryInterface.bulkInsert(
      'roles',
      [
        {
          id: roleId,
          name: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )

    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: adminId,
          username: process.env.ADMIN_USERNAME,
          roleId: roleId,
          password: passwordHash,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {})
    await queryInterface.bulkDelete('users', null, {})
  },
}
