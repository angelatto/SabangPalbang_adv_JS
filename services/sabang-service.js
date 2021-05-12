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
    },

    /* 패키지 등록 */
    create: async function(sabang){
        try{
            const dbBoard = await db.Sabang.create(sabang);
            return dbBoard;
        }catch(error){
            throw error;
        }
    },

    /* 패키지 수정 */
    update: async function(sabang){
        try{
            const target = {};
            target.sabang_name = sabang.sabang_name;
            target.sabang_price = sabang.sabang_price;
            target.sabang_saleprice = sabang.sabang_saleprice;
            target.sabang_buycount = sabang.sabang_buycount;
            target.sabang_viewcount = sabang.sabang_viewcount;
            target.sabang_state = sabang.sabang_state;
            if(sabang.sabang_imgoname != null){
                target.sabang_imgoname = sabang.sabang_imgoname;
                target.sabang_imgsname = sabang.sabang_imgsname;
                target.sabang_imgtype = sabang.sabang_imgtype;
            }
            await db.Sabang.update(target, {
                where: {sabang_id: sabang.sabang_id}
            });
        }catch(error){
            throw error;
        }
    },

    /* 상품 등록 */
    createProduct: async function(product){
        try{
            const dbBoard = await db.Product.create(product);
            return dbBoard;
        }catch(error){
            throw error;
        }
    }



};