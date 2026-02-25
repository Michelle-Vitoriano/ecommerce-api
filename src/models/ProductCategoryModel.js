const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class ProductImageModel extends Model {}

ProductImageModel.init(
  {
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
}, { timestamps: false ,sequelize: database, modelName: 'ProductCategory' });

module.exports = ProductImageModel;