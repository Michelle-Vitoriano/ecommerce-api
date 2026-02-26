const UserModel = require('../models/UserModel');
const MD5 = require('crypto-js/md5');

class AuthService {

    static async login(email, password) {

        const hashedPassword = MD5(password).toString();

        const user = await UserModel.findAll({
            where: {
                email,
                password: hashedPassword
            }
        });

        if (!user) {
            throw new Error("Credenciais inválidas");
        }

        return user;
    }
}

module.exports = AuthService;