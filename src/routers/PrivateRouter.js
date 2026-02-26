const express = require('express');
const UserRouter = require('./UserRouter');
const AuthMiddleware = require('../middleware/AuthMiddleware');


const RotasPrivadas = express.Router();

RotasPrivadas.use(AuthMiddleware);
RotasPrivadas.use(UserRouter);

module.exports = RotasPrivadas;