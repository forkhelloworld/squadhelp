'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate (models) {
      Message.belongsTo(models.Conversation, { foreignKey: 'conversation' })
      Message.belongsTo(models.User, { foreignKey: 'sender' })
    }
  }
  Message.init(
    {
      conversation: {
        type: DataTypes.INTEGER
      },
      sender: {
        type: DataTypes.INTEGER
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      sequelize,
      tableName: 'messages',
      underscored: true,
      modelName: 'Message'
    }
  )
  return Message
}
