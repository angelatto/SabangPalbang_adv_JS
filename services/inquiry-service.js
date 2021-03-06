const db = require("../sequelize/models");

module.exports = {
    totalRows: async function(sid, ansstate){ 
        try{
            let where = {inquiry_sabangid: sid};
            if(ansstate && ansstate != '전체답변'){
                where.inquiry_ansstate = ansstate;
            }
            const result = await db.Inquiry.count({where});
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
    list: async function(pager, sid, ansstate){
        try{
            let where = {inquiry_sabangid: sid};
            if(ansstate && ansstate != '전체답변'){
                where.inquiry_ansstate = ansstate;
            }
            const result = await db.Inquiry.findAll({
                where,
                order: [["inquiry_id", "DESC"]],
                limit: pager.rowsPerPage,
                offset: pager.startRowIndex
            }); 
            return result;
        }catch(error){
            throw error;
        }
    },

    /* 하나의 문의 내역 읽기  */
    getInquiry: async function(inquiry_id){
        try{
            const result = await db.Inquiry.findOne({
                where: {inquiry_id}
            })
            return result;
        }catch(error){
            throw error;
        }
    },

    /* 문의 삭제 */
    delete: async function(inquiry_id){
        try{
            await db.Inquiry.destroy({where: {inquiry_id}})
        }catch(error){
            throw error;
        }
    },

    /* 문의 답변 남기기 */
    update: async function(anscontent, inquiry_id){
        try{
            await db.Inquiry.update({
                inquiry_ansstate: '답변완료',
                inquiry_anscontent: anscontent
            },{
                where: {inquiry_id}
            })
        }catch(error){
            throw error;
        }
    }

};