'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('offers', 'status', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'review'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('offers', 'status', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'pending'
    })
  }
}
