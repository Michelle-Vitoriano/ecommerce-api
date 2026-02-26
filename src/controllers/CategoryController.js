const { Where } = require('sequelize/lib/utils');
const CategoryModel = require('../models/CategoryModel');
const MD5 = require('crypto-js/md5');

class UserController{
    async list(request, response){
        try {
            let {limit = 12, page = 1, fields, use_in_menu } = request.query;

            limit = parseInt(limit);
            page = parseInt(page);

            if(isNaN(limit) || isNaN(page)) {
                return response.status(400).json({ error: "limit e page devem ser números inteiros"});
            };

            const where = {};

            if(use_in_menu !==undefined) {
                if(use_in_menu !== "true" && use_in_menu !== "false") {
                    return response.status(400).json({ error: "use_in_menu deve ser true ou false"});
                }

                where.use_in_menu = use_in_menu === "true";
            };

            let attributes = ["id", "name", "slug", "use_in_menu"];

            if(fields) {
                attributes = fields.split(',');
            };

            let options = {
                where,
                attributes
            };

            if(limit !== -1) {
                options.limit = limit;
                options.offset = (page -1) * limit;
            };

            const { count, rows } = await CategoryModel.findAndCountAll(options);

            return response.status(200).json({
                data: rows,
                total: count,
                limit,
                page
            });
        } catch(error) {
            return response.status(400).json({ error: error.message})
        }
    }


    async queryById(request, response){
        try {
            const category = await CategoryModel.findByPk(request.params.id, {
                attributes: ["id", "name", "slug", "use_in_menu"]
            });

            if(!category) {
                return response.status(404).json({ error: "Category não encontrada"});
            }
            return response.status(200).json({category});
        } catch(error) {
            return response.status(404).json({ error: error.message})
        }
    }

    async create(request, response){
    try {
        const category = request.body;
        CategoryModel.create(category);
        return response.status(201).json({
            mensagem: 'Category cadastrado com sucesso!'
        });
    } catch(error) {
        return response.status(400).json({ error: error.message });
    }
}

    async update(request, response) {
        try {
            const category = await CategoryModel.findByPk(request.params.id);
            if(!category) { return response.status(404).json({ error: "Category não encontrada"})};

            const {name, slug, use_in_menu} = request.body;
            
            if(!name & !slug & use_in_menu === undefined) {
                return response.status(400).json({ error: "Envie ao menos um campo para atualizar"});
            }

            if(name) { category.name = name};
            if(slug) { category.slug = slug};
            if(use_in_menu !== undefined) { category.use_in_menu = use_in_menu};
            
            await category.save();
            return response.status(204).send();
        } catch(error) {
            return response.status(400).json({ error: error.message });
        }
    }
    
    async delete(request, response) {
        try {
            const category = await CategoryModel.findByPk(request.params.id);
            if(!category) { return response.status(404).json({ error: "Category não encontrada"}) };
            await category.destroy();
            return response.status(204).send();
        } catch(error) {
            return response.status(404).json({ error: error.message });
        }
    }
}


module.exports = UserController;