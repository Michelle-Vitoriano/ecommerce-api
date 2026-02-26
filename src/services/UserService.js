const UserModel = require('../models/UserModel');
const MD5 = require('crypto-js/md5');

class UserService {

    static async create(data) {
        const existingUser = await UserModel.findOne({
            where: { email: data.email}
        })
        console.log(existingUser);
        
        
        if(existingUser) {
            throw new Error("Email já cadastrado");
        }

        const hashedPassword = MD5(data.password).toString();

        const user = await UserModel.create({
            firstname: data.firstname,
            surname: data.surname,
            email: data.email,
            password: hashedPassword
        });
        console.log(user);
        
        

        return user;
    }


    static async findById(id) {
        const user = await UserModel.findByPk(id);

        if(!user) {
            throw new Error("Usuário não encontrado");
        }

        return user;
    }

    static async update(id, data) {
        const user = await UserModel.findByPk(id);

        if(!user) {throw new Error("Usuário não encontrado")};

        const { firstname, surname, email, password } = data;

        if (!firstname && !surname && !email && !password) {
                throw new Error("Envie ao menos um campo para atualizar")
            }
        if (email !== undefined && !email.includes("@")) {
            throw new Error("Email inválido")
        }

        if(firstname) user.firstname = firstname;
        if(surname) user.surname = surname;
        if(email) user.email = email;
        if(password) user.password = MD5(password).toString();

        await user.save();
        return user;
    }

    static async delete(id) {
        const user = await UserModel.findByPk(id);
        
        if(!user) {
            throw new Error("Usuário não encontrado");
        }

        await user.destroy();

        return true;
    }
}

module.exports = UserService;