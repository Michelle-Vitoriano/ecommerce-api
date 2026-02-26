const express = require('express');
const UserRouter = require('./UserRouter');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const CategoryRouter = require('./CategoryRouter');
const ProductRouter = require('./ProductRouter');


const PrivateRouter = express.Router();

PrivateRouter.use(AuthMiddleware);
PrivateRouter.use(UserRouter);
PrivateRouter.use(CategoryRouter);
PrivateRouter.use(ProductRouter);

module.exports = PrivateRouter;