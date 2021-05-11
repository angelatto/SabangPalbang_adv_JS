const db = require("../sequelize/models");

module.exports = {
    totalRows: async function(){ 
        try{
            const result = await db.Sabang.count();
            console.log("Sabang Service Result: ", result);
            return result;
        }catch(error){
            throw error;
        }
    },

    list: async function(pager){
        try{
            const result = await db.Sabang.findAll({
                order: [["sabang_buycount", "DESC"]],
                limit: pager.rowsPerPage,
                offset: pager.startRowIndex
            }); 
            return result;
        }catch(error){
            throw error;
        }
    },

    getSabang: async function(sabang_id){
        try{
            const result = await db.Sabang.findOne({
                where: {sabang_id} 
            });
            return result;
        }catch(error){
            throw error;
        }
    },

    getProducts: async function(sabang_id){
        try{
            const result = await db.Product.findAll({
                where: {sabang_id} 
            });
            console.log("service- getProduct: ", result);
            return result;
        }catch(error){
            throw error;
        }
    },

    getProduct: async function(product_id){
        try{
            const result = await db.Product.findOne({
                where: {product_id} 
            });
            return result;
        }catch(error){
            throw error;
        }
    }

};