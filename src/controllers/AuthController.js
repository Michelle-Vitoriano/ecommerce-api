const UserModel = require('../models/UserModel');
const MD5 = require('crypto-js/md5');
class AuthController {
    async login(email, password) {
        
        const dados = await UserModel.findAll({
            where: {
                email: email,
                password: MD5(password).toString()
            }
        })

        if(dados.length){
            return dados[0];
        }
        
        return null;
        
    }
}

module.exports = AuthController;

