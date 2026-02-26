const ProductModel = require('../models/ProductModel');
const ProductCategoryModel = require('../models/ProductCategoryModel');
const CategoryModel = require('../models/CategoryModel');
const ProductImageModel = require('../models/ProductImageModel');
const OptionsProductModel = require('../models/OptionsProductModel');

class ProductController{
    constructor() {
        ProductModel.associate({ProductImageModel, OptionsProductModel, ProductCategoryModel});
    }
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

            const { count, rows } = await ProductModel.findAndCountAll(options);

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
            const category = await ProductModel.findByPk(request.params.id, {
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
        const t = await ProductModel.sequelize.transaction();

        try {
            const {images, category_ids, options,  ...body} = request.body;

            if(!category_ids || !Array.isArray(category_ids)) {
                await t.rollback();
                return response.status(400).json({ error: "category_id recisa ser uma array"});
            }
            const categories = await CategoryModel.findAll({
                where: {id: category_ids },
                transaction: t
            });
            if(categories.length !== category_ids.length) {
                await t.rollback();
                return response.status(400).json({ error: "Uma ou mais categorias não existem"})
            }


            const product = await ProductModel.create(body, { transaction: t });

            if(category_ids?.length) {
                await product.setCategories(category_ids, { transaction: t });
            }
            if(images?.length) {
                const imagesData = images.map(img => ({
                    product_id: product.id,
                    enable: true,
                    path: img.content
                }));
                
                await ProductImageModel.bulkCreate(imagesData, { transaction: t });
            }
            if(options?.length) {
                const optionsData = options.map(opt => ({
                    ...opt,
                    product_id: product.id
                }));

                await OptionsProductModel.bulkCreate(optionsData, { transaction: t });
            }
             
            await t.commit();

            return response.status(201).json({
                mensagem: 'Product cadastrado com sucesso!'
            });
        } catch(error) {
            await t.rollback();
            return response.status(400).json({ error: error.message });
        }
    }

    async update(request, response) {
        try {
            const category = await ProductModel.findByPk(request.params.id);
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
            const category = await ProductModel.findByPk(request.params.id);
            if(!category) { return response.status(404).json({ error: "Category não encontrada"}) };
            await category.destroy();
            return response.status(204).send();
        } catch(error) {
            return response.status(404).json({ error: error.message });
        }
    }
}


module.exports = ProductController;