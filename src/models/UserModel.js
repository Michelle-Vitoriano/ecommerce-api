const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class UserModel extends Model {}

UserModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstname: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: true, sequelize: database, modelName: 'User' });

module.exports = UserModel;