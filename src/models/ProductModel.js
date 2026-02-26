const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');
const CategoryModel = require('./CategoryModel');

class ProductModel extends Model {
  static associate({ProductImageModel, OptionsProductModel, ProductCategoryModel}){
      ProductModel.hasMany(ProductImageModel, { foreignKey: 'product_id', onDelete: 'CASCADE' });
      ProductModel.hasMany(OptionsProductModel, { foreignKey: 'product_id', onDelete: 'CASCADE' });
      ProductModel.belongsToMany(CategoryModel, { 
        through: ProductCategoryModel,
        as: 'categories', 
        foreignKey: 'product_id', 
        otherKey: 'category_id' 
      });
  }
}

ProductModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    enabled: { type: DataTypes.BOOLEAN, defaultValue: 0 },
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING(100), allowNull: false },
    use_in_menu: { type: DataTypes.BOOLEAN, defaultValue: 0 },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    description: { type: DataTypes.STRING},
    price: { type: DataTypes.FLOAT, allowNull: false },
    price_with_discount: { type: DataTypes.FLOAT, allowNull: false }
}, { timestamps: true, sequelize: database, modelName: 'Product' });

module.exports = ProductModel;