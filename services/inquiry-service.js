const db = require("../sequelize/models");

module.exports = {
    totalRows: async function(sid){ 
        try{
            const result = await db.Inquiry.count({
                where:{inquiry_sabangid: sid}
            });
            return result;
        }catch(error){
            throw error;
        }
    },

    getNoAnsCount: async function(sid){ 
        try{
            const result = await db.Inquiry.count({
                where:{
                    inquiry_sabangid: sid, 
                    inquiry_ansstate: '대기중'
                }
            });
            return result;
        }catch(error){
            throw error;
        }
    },

    /* 사방에 대한 문의 목록 */
    list: async function(pager, sid){
        try{
            const result = await db.Inquiry.findAll({
                where: {inquiry_sabangid: sid},
                order: [["inquiry_id", "DESC"]],
                limit: pager.rowsPerPage,
                offset: pager.startRowIndex
            }); 
            return result;
        }catch(error){
            throw error;
        }
    }


};