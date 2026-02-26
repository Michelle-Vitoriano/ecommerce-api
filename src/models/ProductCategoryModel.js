const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class ProductCategoryModel extends Model {}

ProductCategoryModel.init(
  {
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
}, { timestamps: false ,sequelize: database, modelName: 'ProductCategory' });


module.exports = ProductCategoryModel;