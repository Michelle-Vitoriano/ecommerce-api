const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const AuthController = require('../controllers/AuthController');

const key = process.env.APP_KEY;
const RotasPublicas = express.Router();

RotasPublicas.post('/token', async (request, response) => {
    const body = request.body;
    const auth = new AuthController();
    const dados = await auth.login(body.email, body.password);
    if (dados) {
        const token = jwt.sign(
            { id: dados.id, username: dados.username }, key,
            { expiresIn: '1h' }
        );
        response.status(200).json({ token });
    } else {
        response.status(400).json({ error: 'Credenciais inválidas' });
    }
});

module.exports = RotasPublicas;