'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate (models) {
      Rating.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id' })
      Rating.belongsTo(models.Offer, {
        foreignKey: 'offer_id',
        targetKey: 'id'
      })
    }
  }

  Rating.init(
    {
      offerId: {
        field: 'offer_id',
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'Offer',
          key: 'id'
        }
      },
      userId: {
        field: 'user_id',
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      mark: {
        allowNull: false,
        type: DataTypes.FLOAT,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 5
        }
      }
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      tableName: 'ratings',
      modelName: 'Rating'
    }
  )

  return Rating
}
