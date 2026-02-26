const UserService = require('../services/UserService');

class UserController{
    async queryById(request, response){
        try {
            const user = await UserService.findById(request.params.id);
            return response.status(200).json({user});
        } catch(error) {
            return response.status(404).json({ error: error.message})
        }
    }

    async create(request, response){
    try {
        const user = await UserService.create(request.body);
        console.log(user);
        
        return response.status(201).json({
            mensagem: 'User cadastrado com sucesso!'
        });
    } catch(error) {
        return response.status(400).json({ error: error.message });
    }
}

    async update(request, response) {
        try {
            await UserService.update(request.params.id, request.body);
            return response.status(204).send();
        } catch(error) {
            return response.status(400).json({ error: error.message });
        }
    }
    
    async delete(request, response) {
        try {
            await UserService.delete(request.params.id);
            return response.status(204).send();
        } catch(error) {
            return response.status(404).json({ error: error.message });
        }
    }
       
}


module.exports = UserController;