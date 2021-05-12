const db = require("../sequelize/models");

module.exports = {
    totalRows: async function(){ 
        try{
            const result = await db.OrderMain.count();
            return result;
        }catch(error){
            throw error;
        }
    },

    list: async function(pager){
        try{
            const result = await db.OrderMain.findAll({
                order: [["order_id", "DESC"]],
                limit: pager.rowsPerPage,
                offset: pager.startRowIndex
            }); 
            return result;
        }catch(error){
            throw error;
        }
    },

    update: async function(order){
        try{
            await db.OrderMain.update({
                order_zipcode: order.order_zipcode,
                order_roadaddress: order.order_roadaddress,
                order_detailaddress: order.order_detailaddress,
                order_state: order.order_state,
                order_phone: order.order_phone
            },{ where: {order_id: order.order_id}})
        }catch(error){
            throw error;
        }
    },

    delete: async function(order_id){
        try{
            const result = await db.OrderMain.destroy({
                where: {order_id}
            });
            return result;
        }catch(error){
            throw error;
        }
    },

    getOrderWithMemberInfo: async function(order_id){
        try{
            // 다 대 일 associate 관계 설정 이용 
            const order = await db.OrderMain.findOne({where: {order_id}});
            order.dataValues.Member = await order.getMember();
            return order;
        }catch(error){
            throw error;
        }
    }
    
};