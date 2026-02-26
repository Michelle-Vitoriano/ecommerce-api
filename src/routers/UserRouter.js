const express = require('express');
const UserController = require('../controllers/UserController');
const UserRouter = express.Router();


const userController = new UserController();


UserRouter.get('/user/:id', userController.queryById);
UserRouter.post('/user', userController.create);
UserRouter.put('/user/:id', userController.update);
UserRouter.delete('/user/:id', userController.delete);


module.exports = UserRouter;