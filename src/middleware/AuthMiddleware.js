const jwt = require('jsonwebtoken');
require('dotenv').config();


const key = process.env.APP_KEY;

module.exports = (request, response, next) => {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        return response.status(400).json({ error: "Token não enviado" });
    }
        
    const token = authHeader.split(' ')[0];
    

    try{
        jwt.verify(token, key);
        next()
    } catch(JsonWebTokenError) {
        return response.status(403).send("Não autorizado");
    }
}