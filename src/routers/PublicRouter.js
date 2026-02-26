const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const AuthController = require('../controllers/AuthController');

const key = process.env.APP_KEY;
const RotasPublicas = express.Router();

RotasPublicas.post('/token', AuthController.login);

module.exports = RotasPublicas;