const jwt = require('jsonwebtoken');
const AuthService = require('../services/AuthService');

const key = process.env.APP_KEY;

class AuthController {
    static async login(request, response) {
        const { email, password } = request.body;
        try {
            const user = await AuthService.login(email, password);

            const token =  jwt.sign(
                { id: user.id, username: user.username},
                key,
                { expiresIn: '1h' }
            );
            return response.status(200).json({ token: token});
        } catch(error) {
            return response.status(400).json({ error: error.message });
        }
    }
}

module.exports = AuthController;

