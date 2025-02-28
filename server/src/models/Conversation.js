'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate (models) {
      Conversation.hasMany(models.Message, { foreignKey: 'conversation' })
      Conversation.hasMany(models.ConversationParticipant, {
        foreignKey: 'chat_id'
      })
      Conversation.hasMany(models.CatalogChat, { foreignKey: 'chat_id' })
    }
  }
  Conversation.init(
    {},
    {
      sequelize,
      tableName: 'conversations',
      underscored: true,
      modelName: 'Conversation'
    }
  )
  return Conversation
}
