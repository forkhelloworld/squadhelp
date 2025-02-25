'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    static associate (models) {
      Catalog.belongsTo(models.Users, { foreignKey: 'user_id' })
      Catalog.hasMany(models.CatalogChat, {foreignKey: 'catalog_id'})
    }
  }
  Catalog.init(
    {
      user_id: {
        field: 'user_id',
        type: DataTypes.INTEGER, 
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(256),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      sequelize,
      underscored: true,
      tableName: 'catalogs',
      modelName: 'Catalog'
    }
  )
  return Catalog
}
