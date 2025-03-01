'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ConversationParticipant extends Model {
    static associate (models) {
      ConversationParticipant.belongsTo(models.Conversation, {
        foreignKey: 'chat_id'
      })
      ConversationParticipant.belongsTo(models.User, { foreignKey: 'user_id' })
    }
  }
  ConversationParticipant.init(
    {
      chat_id: {
        field: 'chat_id',
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      user_id: {
        field: 'user_id',
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      is_blocked: {
        field: 'is_blocked',
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      is_favorite: {
        field: 'is_favorite',
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      tableName: 'conversation_participants',
      underscored: true,
      modelName: 'ConversationParticipant'
    }
  )
  return ConversationParticipant
}
