const express = require('express');
const ProductController = require('../controllers/ProductController');
const ProductRouter = express.Router();


const productController = new ProductController();

ProductRouter.get('/v1/product/search', productController.list);
ProductRouter.post('/v1/product', productController.create);
ProductRouter.get('/v1/product/:id', productController.queryById);
ProductRouter.put('/v1/product/:id', productController.update);
ProductRouter.delete('/v1/product/:id', productController.delete);


module.exports = ProductRouter;