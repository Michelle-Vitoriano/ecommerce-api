const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const UserRouter = require('./UserRouter');
// const PostRoutes = require('./postRoutes');
// const TagsRoutes = require('./TagsRoutes');
// const commentsRouter = require('./commentsRoutes');

const key = process.env.APP_KEY;

const RotasPrivadas = express.Router();

RotasPrivadas.use((request, response, next) => {
    const token = request.headers.token;

    try{
        jwt.verify(token, key);
    } catch(JsonWebTokenError) {
        return response.status(403).send("Não autorizado", JsonWebTokenError);
    }

    
    next();
})

RotasPrivadas.use(UserRouter);
// RotasPrivadas.use(PostRoutes);
// RotasPrivadas.use(TagsRoutes);
// RotasPrivadas.use(commentsRouter);

module.exports = RotasPrivadas;