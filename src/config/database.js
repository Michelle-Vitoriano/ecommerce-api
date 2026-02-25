const { Sequelize, DataTypes } = require('sequelize');

const database = new Sequelize('loja', 'root', '15toor49', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

module.exports = database;