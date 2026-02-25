const database = require('./src/config/database');


const UserModel = require('./src/models/UserModel');
const ProductModel = require('./src/models/ProductModel');
const CategoryModel = require('./src/models/CategoryModel');
const ProductImageModel = require('./src/models/ProductImageModel');
const OptionsProductModel = require('./src/models/OptionsProductModel');
const ProductCategoryModel = require('./src/models/ProductCategoryModel');


async function syncDatabase() {
  try {
    await database.sync({ force: true });
    console.log('Banco de dados resetado e sincronizado!');
  } catch (error) {
    console.error('Falha na sincronização:', error);
  }
}

syncDatabase();