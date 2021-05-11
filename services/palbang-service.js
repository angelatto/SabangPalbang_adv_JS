const db = require("../sequelize/models");

module.exports = {
    totalRows: async function(){ 
        try{
            const result = await db.Palbang.count();
            return result;
        }catch(error){
            throw error;
        }
    },

    list: async function(pager){
        try{
            const result = await db.Palbang.findAll({
                order: [["palbang_likecount", "DESC"]],
                limit: pager.rowsPerPage,
                offset: pager.startRowIndex
            }); 
            return result;
        }catch(error){
            throw error;
        }
    },

    getPalbang: async function(palbang_id){
        try{
            const result = await db.Palbang.findOne({
                where: {palbang_id} 
            });
            return result;
        }catch(error){
            throw error;
        }
    },

    getPalbangDetail: async function(palbang_id){
        try{
            const result = await db.PalbangDetail.findAll({
                where: {palbang_id} 
            });
            return result;
        }catch(error){
            throw error;
        }
    },

    getPalbangDetailByNo: async function(palbang_detailno){
        try{
            const result = await db.PalbangDetail.findOne({
                where: {palbang_detailno} 
            });
            return result;
        }catch(error){
            throw error;
        }
    },

    delete: async function(palbang_id) {
        try{
            const result = await db.Palbang.destroy({
                where: {palbang_id}
            });
            return result;
        }catch(error){
            throw error;
        }
    }
};