const express = require('express');
const UserController = require('../controllers/UserController');
const PostRoutes = express.Router();


const userController = new UserController();


PostRoutes.get('/posts', userController.list);
PostRoutes.get('/user/:id', userController.queryById);
PostRoutes.post('/user', userController.create);
PostRoutes.put('/user/:id', userController.update);
PostRoutes.delete('/user/:id', userController.delete);


module.exports = PostRoutes;