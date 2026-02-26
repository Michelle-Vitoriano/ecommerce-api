const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class OptionsProductModel extends Model {
  static associate({OptionsProductModel, ProductModel}){
      OptionsProductModel.belongsTo(ProductModel, { foreignKey: 'product_id' });
  }
}

OptionsProductModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    shape: { type: DataTypes.ENUM("square", "circle"), defaultValue: "square" },
    radius: { type: DataTypes.INTEGER, defaultValue: 0 },
    type: { type: DataTypes.ENUM("text", "color"), defaultValue: "text" },
    values: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false ,sequelize: database, modelName: 'OptionsProduct' });

module.exports = OptionsProductModel;