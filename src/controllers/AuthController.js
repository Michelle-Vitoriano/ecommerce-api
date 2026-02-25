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

    // // Registrar Novo Usuário
    // register = async (req, res) => {
    //     const { firtname, surname, email, password} = req.body;
    //     // Criptografando a senha antes de salvar
    //     const hashedPassword = await bcrypt.hash(password, 10);
    //     try {
    //         const user = await UserModel.create({ email, password: hashedPassword, email });
    //         res.json({ user, token: generateToken(user) });
    //     } catch (error) { 
    //         res.json({ message: "Ocorreu um erro ao registrar o Usuário" })
    //     }
    // };
}

module.exports = AuthController;

