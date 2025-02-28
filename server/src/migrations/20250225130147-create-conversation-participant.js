'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('conversation_participants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chat_id: {
        field: 'chat_id',
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE'
      },
      user_id: {
        field: 'user_id',
        type: Sequelize.INTEGER
      },
      is_blocked: {
        field: 'is_blocked',
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_favorite: {
        field: 'is_favorite',
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('conversation_participants')
  }
}
