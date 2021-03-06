const db = require("../sequelize/models");

module.exports = {
    totalRows: async function(filterType){ 
        try{
            let where = null;
            if(filterType){
                where = {order_state: filterType};
            }
            const result = await db.OrderMain.count({where});
            return result;
        }catch(error){
            throw error;
        }
    },

    list: async function(pager, orderType){
        try{
            let order = [["order_id", "DESC"]]; 
            if(orderType){
                if(orderType == 'new'){
                    order = [["order_date", "DESC"]];
                }else if(orderType == 'old'){
                    order = [["order_date", "ASC"]];
                }
            }
            const result = await db.OrderMain.findAll({
                order,
                limit: pager.rowsPerPage,
                offset: pager.startRowIndex
            }); 
            return result;
        }catch(error){
            throw error;
        }
    },

    filterlist: async function(pager, filterType){
        try{
            const result = await db.OrderMain.findAll({
                where: {order_state: filterType},
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
            // ??? ??? ??? associate ?????? ?????? ?????? 
            const order = await db.OrderMain.findOne({where: {order_id}});
            order.dataValues.Member = await order.getMember();
            return order;
        }catch(error){
            throw error;
        }
    }
    
};