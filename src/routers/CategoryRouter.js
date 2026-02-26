const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const CategoryRouter = express.Router();


const categoryController = new CategoryController();

CategoryRouter.get('/v1/category/search', categoryController.list);
CategoryRouter.post('/v1/category', categoryController.create);
CategoryRouter.get('/v1/category/:id', categoryController.queryById);
CategoryRouter.put('/v1/category/:id', categoryController.update);
CategoryRouter.delete('/v1/category/:id', categoryController.delete);


module.exports = CategoryRouter;