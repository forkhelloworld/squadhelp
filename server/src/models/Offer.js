'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    static associate (models) {
      Offer.belongsTo(models.User, { foreignKey: 'user_id', sourceKey: 'id' })
      Offer.belongsTo(models.Contest, {
        foreignKey: 'contest_id',
        sourceKey: 'id'
      })
      Offer.hasOne(models.Rating, { foreignKey: 'offer_id', targetKey: 'id' })
    }
  }

  Offer.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      contestId: {
        field: 'contest_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Contest',
          key: 'id'
        }
      },
      text: {
        allowNull: true,
        type: DataTypes.STRING
      },
      fileName: {
        field: 'file_name',
        allowNull: true,
        type: DataTypes.STRING
      },
      originalFileName: {
        field: 'original_file_name',
        allowNull: true,
        type: DataTypes.STRING
      },
      status: {
        allowNull: true,
        type: DataTypes.STRING,
        defaultValue: 'pending'
      }
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'offers',
      modelName: 'Offer'
    }
  )

  return Offer
}
