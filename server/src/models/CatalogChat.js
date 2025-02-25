'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class CatalogChat extends Model {
    static associate (models) {
      CatalogChat.belongsTo(models.Catalog, {
        foreignKey: 'catalog_id'
      })

      CatalogChat.belongsTo(models.Conversation, {
        foreignKey: 'chat_id'
      })
    }
  }
  CatalogChat.init(
    {
      catalog_id: {
        field: 'catalog_id',
        type: DataTypes.INTEGER,
        allowNull: false
      },
      chat_id: {
        field: 'chat_id',
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      underscored: true,
      tableName: 'catalog_chats',
      modelName: 'CatalogChat'
    }
  )
  return CatalogChat
}
