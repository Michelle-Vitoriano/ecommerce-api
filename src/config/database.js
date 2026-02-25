const { Sequelize } = require('sequelize');

require('dotenv').config();

const dataBase = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;

const database = new Sequelize(dataBase, user, password, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: Number(process.env.DB_PORT)
});

module.exports = database;