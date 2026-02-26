const express = require('express');
const AuthController = require('../controllers/AuthController');

const PublicRouter = express.Router();

PublicRouter.post('/token', AuthController.login);
module.exports = PublicRouter;