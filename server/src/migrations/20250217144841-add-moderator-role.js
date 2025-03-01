'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_users_role" ADD VALUE 'moderator';
    `)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'role', {
      type: Sequelize.STRING,
      allowNull: false
    })
    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS "enum_users_role";
    `)
    await queryInterface.changeColumn('users', 'role', {
      type: Sequelize.ENUM('customer', 'creator'),
      allowNull: false
    })
  }
}
