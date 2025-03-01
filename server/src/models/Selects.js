'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Select extends Model {}

  Select.init(
    {
      type: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      describe: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      timestamps: false,
      tableName: 'selects',
      modelName: 'Select'
    }
  )

  return Select
}
