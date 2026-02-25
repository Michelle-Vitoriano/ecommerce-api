const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class ProductImageModel extends Model {
  static associate({ProductImageModel, ProductModel}){
      ProductImageModel.belongsTo(ProductModel, { foreignKey: 'product_id', onDelete: 'CASCADE' });
  }
}

ProductImageModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    enabled: { type: DataTypes.BOOLEAN, defaultValue: 0 },
    path: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false ,sequelize: database, modelName: 'ProductImage' });

module.exports = ProductImageModel;