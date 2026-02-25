const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class CategoryModel extends Model {}

CategoryModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING(100), allowNull: false },
    use_in_menu: { type: DataTypes.BOOLEAN, defaultValue: 0 }
}, { timestamps: true, sequelize: database, modelName: 'Category' });

module.exports = CategoryModel;