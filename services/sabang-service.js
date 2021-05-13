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

    list: async function(pager, orderType){
        try{
            let order = [["sabang_buycount", "DESC"]]; 
            if(orderType){
                if(orderType == 'view'){
                    order = [["sabang_viewcount", "DESC"]];
                }else if(orderType == 'high'){
                    order = [["sabang_saleprice", "DESC"]];
                }else if(orderType == 'low'){
                    order = [["sabang_saleprice", "ASC"]];
                }
            }
            const result = await db.Sabang.findAll({
                order,
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

    /* 패키지 삭제 */
    delete: async function(sabang_id){

        try{
            await db.Sabang.destroy({
                where: {sabang_id}
            })
        }catch(error){
            throw error;
        }
    },

    /* 상품 등록 */
    createProduct: async function(product){
        try{
            // 1. 상품 테이블 등록 
            const dbBoard = await db.Product.create(product);
           
            // 2. 사방 테이블 가격 갱신 
            await db.Sabang.increment({
                sabang_price: parseInt(product.product_price),
                sabang_saleprice: parseInt(product.product_price)
            }, {where:{sabang_id: product.sabang_id}});

            return dbBoard;
        }catch(error){
            throw error;
        }
    },
    
    /* 상품 수정 */
    updateProduct: async function(product, updatePrice){
        try{
            const target = {};
            target.product_name = product.product_name;
            target.product_price = product.product_price;
            target.product_explain1 = product.product_explain1;
            target.product_explain2 = product.product_explain2;
            if(product.product_imgoname != null){
                target.product_imgoname = product.product_imgoname;
                target.product_imgsname = product.product_imgsname;
                target.product_imgtype = product.product_imgtype;
            }
            
            console.log("target: ", target);

            // 1. 상품 테이블 수정 
            await db.Product.update(target, {
                where: {product_id: product.product_id}
            });

            // 2. 사방 테이블 가격 갱신
            console.log("111111112: ", updatePrice);

            await db.Sabang.increment({
                sabang_price: updatePrice,
                sabang_saleprice: updatePrice
            }, {where:{sabang_id: product.sabang_id}});

        }catch(error){
            throw error;
        }
    },

    /* 상품 삭제 */
    deleteProduct: async function(product){
        try{
            // 1. 상품 테이블 삭제 
            await db.Product.destroy({where: {product_id: product.product_id}});

            // 2. 사방 테이블 가격 갱신 
            await db.Sabang.decrement({
                sabang_price: parseInt(product.product_price),
                sabang_saleprice: parseInt(product.product_price)
            }, {where:{sabang_id: product.sabang_id}});

        }catch(error){
            throw error;
        }
    }
};