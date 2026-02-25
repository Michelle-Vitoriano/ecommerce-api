const { Where } = require('sequelize/lib/utils');
const UserModel = require('../models/UserModel');
const MD5 = require('crypto-js/md5');

class UserController{
    async listar(request, response){
        const dados = await Post.findAll(
            {include: [
                {
                    model: UserModel,
                    attributes: ['userName', 'is_active', 'email'],
                    include: [{ model: Profile, attributes: ['firstName', 'lastName'] }]
                },
                {
                    model: TagsModel,
                }
            ]});
        return response.json(dados);
    }
    async list(request, response) {
        try {
            const { columns } = request.query;
            let attributes = null;

            if (columns) {
            // Converte "title,slug" em ['title', 'slug']
            const requestedColumns = columns.split(',');
            const forbidden = ['password', 'token', 'salt'];

            // Filtra apenas o que é permitido
            attributes = requestedColumns.filter(col => !forbidden.includes(col));    
            }

            const posts = await Post.findAll({
            attributes, // Aplica o filtro dinâmico
            include: [
                { model: Users, attributes: ['userName'] }
            ]
            });
            response.json(posts);
        } catch (error) { 
            response.status(500).json({ error: error.message });
        }
    }
    async queryById(request, response){
        const id = request.params.id;
        const user = await UserModel.findByPk(id, {
            attributes: ['firstname', 'surname', 'email', 'password']
        });


        if(!user) {
            return response.status(404).json({ mensagem: "Usuário não encontrado"});  
        } else{
            return response.status(200).json(user);
        }

        
    }
    // async create(request, response){
    //     try {
    //         let body = request.body;
    //         body.password = MD5(body.password);
            
    //         let user = await UserModel.create(body);
            

    //         return response.status(201).json({
    //             mensagem: "User criado com sucesso!"
    //         });
    //     } catch(error) {
    //         return response.status(400).json({
    //             mensagem: "Todos os campos devem ser preenchidos"
    //         });
    //     }
    // }

    async create(request, response){
    try {
        const body = request.body;
        console.log(body);
        const password = MD5(body.password).toString();
        console.log(body);
        body.password = password;
        const user = await UserModel.create(body);
        
        return response.status(201).json({
            mensagem: 'User cadastrado com sucesso!'
        })
    } catch(error) {
        
        return response.status(400).json({
            mensagem: "Já existe um usuário cadastrado nesse email"
        });
    }
}

    async update(request, response) {
        try {
            const { id } = request.params;
            const user = await UserModel.findByPk(id);
            if (!user) return response.status(404).json({ error: 'User não encontrado' });

            const { firstname, lastname, email, password } = request.body;
            if (!firstname && !lastname && !email && !password) {
                return response.status(400).json({ 
                    error: "Envie ao menos um campo para atualizar" 
                });
            }
            if (email !== undefined && !email.includes("@")) {
                return response.status(400).json({ 
                    error: "Email inválido" 
                });
            }

            user.firstname = request.body.firstname || user.firstname;
            user.lastname = request.body.lastname || user.lastname;
            user.email = request.body.email || user.email;
            user.password = request.body.password || user.password;

            await user.save();
            return response.status(204).json();
        } catch(error) {
            // return response.status(401).json("Dados da requisição incorretos");
        }
    }
    
    async delete(request, response) {
        const id = request.params.id;
        const user = await UserModel.findByPk(id);
        if (!user) return response.status(404).json({ erro: "Usuário não encontrado" });
        
        await UserModel.destroy({ where: { id: request.params.id } });

        response.status(204).json();
    }
       
}


module.exports = UserController;