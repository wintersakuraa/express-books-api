'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        validate: {
          isUUID: 4,
        },
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      refreshToken: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      roleId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })

    await queryInterface.createTable('books', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        validate: {
          isUUID: 4,
        },
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      genre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })

    await queryInterface.createTable('roles', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        validate: {
          isUUID: 4,
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isLowercase: true,
          notEmpty: true,
          notNull: true,
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('users')
    await queryInterface.dropTable('books')
    await queryInterface.dropTable('roles')
  },
}
