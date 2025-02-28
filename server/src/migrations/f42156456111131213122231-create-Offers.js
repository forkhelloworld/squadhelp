'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('offers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        field: 'user_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      contestId: {
        field: 'contest_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Contest',
          key: 'id'
        }
      },
      text: {
        allowNull: true,
        type: Sequelize.STRING
      },
      fileName: {
        field: 'file_name',
        allowNull: true,
        type: Sequelize.STRING
      },
      originalFileName: {
        field: 'original_file_name',
        allowNull: true,
        type: Sequelize.STRING
      },
      status: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: 'pending'
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Offers')
  }
}
