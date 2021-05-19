const { sequelize } = require("../sequelize/models");
const db = require("../sequelize/models");
const Op = db.Sequelize.Op;


module.exports = {
    /* --------------------------------회원 실적 ---------------------------------------- */

    // 총 회원수 
    // where: {member_authority: 'ROLE_MEMBER'}
    getMemberCount: async function(){
        try{
            const result = await db.Member.count();
            return result;
        }catch(error){
            throw error;
        }
    },

    // 최근 한 달간 가입한 회원수 
    getRecentJoinCount: async function(){
        try{
            // 한달 전 날짜 구하는 로직 
            const curr = new Date();
            const lastDayofLastMonth = (new Date(curr.getYear(), curr.getMonth(), 0)).getDate();
            if(curr.getDate() > lastDayofLastMonth) {
                curr.setDate(lastDayofLastMonth); 
            }
            curr.setMonth(curr.getMonth() - 1);
            console.log("한달전 날짜: ", curr);

            const result = await db.Member.count({
                where: {
                    join_date: { [Op.gte]: curr}
                }
            });
            return result;
        }catch(error){
            throw error;
        }
    },

    // 실구매 회원수 
    getBuyMemberCount: async function(){
        try{
            // select count(distinct order_memberid) from ordermain;
            const result = await db.OrderMain.count({col: 'order_memberid', distinct: true});
            return result;
        }catch(error){
            throw error;
        }
    },

    // list - 우수 고객 top5 (주문 횟수 기준)
    /*
        select member_name, member_id, member_email
        from team2.ordermain, team2.member
        where order_memberid = member_id
        group by member_id
        order by count(member_id) desc
        limit 5;
    */
    getVipMembers: async function(){
        try{
            // Member와 OrderMain 조인
            // 다(N).findAll
            const result = await db.OrderMain.findAll({
                attributes: [
                    'Member.member_name', 'order_memberid', 'Member.member_email',
                    [db.Sequelize.fn('count', db.Sequelize.col('order_memberid')), 'cnt']
                ],
                include: [{ 
                    model: db.Member
                 }],
                 group: ['order_memberid'],
                 order: [[db.Sequelize.literal('cnt'), 'DESC']],
                 limit: 5
             });
             return result;
        }catch(error){
            
            throw error;
        }
    },

    // list - 인플루언서 고객 top5 (팔방 작성 횟수 기준)
    getInfluencers: async function(){
        try{
             const result = await db.Palbang.findAll({
                attributes: [
                    'Member.member_id', 'palbang_nickname', 'Member.member_email',
                    [db.Sequelize.fn('count', db.Sequelize.col('palbang_nickname')), 'cnt']
                ],
                include: [{ 
                    model: db.Member
                 }],
                 group: ['palbang_nickname'],
                 order: [[db.Sequelize.literal('cnt'), 'DESC']],
                 limit: 5
             });
             return result;
        }catch(error){
            throw error;
        }
    },

    /* --------------------------------사방 실적 ---------------------------------------- */
    getBestSabang: async function(){
        try{
            const result = await db.Sabang.findOne({
                order: [['sabang_buycount', 'DESC']],
                limit: 1
            });
            return result;
        }catch(error){
            throw error;
        }
    },

    getBestProduct: async function(){
        try{
            const result = await db.Product.findOne({
                order: [['product_buycount', 'DESC']],
                limit: 1
            });
            return result;
        }catch(error){
            throw error;
        }
    },

    getBestPalbang: async function(){
        try{
            const result = await db.Palbang.findOne({
                order: [['palbang_likecount', 'DESC']],
                limit: 1
            });
            return result;
        }catch(error){
            throw error;
        }
    },

    /* --------------------------------주문 실적 ---------------------------------------- */
    totalCount: async function(){
        try{
            const result = await db.OrderMain.count();
            return result;
        }catch(error){
            throw error;
        }
    },

    sumtotalprice: async function(){
        try{
            const result = await db.OrderMain.sum('order_price');
            return result;
        }catch(error){
            throw error;
        }
    },

    paycount: async function(payBy){
        try{
            const result = await db.OrderMain.count({
                where: {order_payment: payBy}
            });
            return result;
        }catch(error){
            throw error;
        }
    },

    totalpriceByMonth: async function(targetMonth){
        try{
            const result = await db.OrderMain.findOne({
                attributes: [
                    [sequelize.fn('month', sequelize.col("order_date")), 'month'],
                    [sequelize.fn('sum', sequelize.col("order_price")), 'sum']
                ],
                where: {
                    [Op.and]: [
                      sequelize.where(sequelize.fn('month', sequelize.col('order_date')), targetMonth)
                    ]
                }
            });
            return result.dataValues;
        }catch(error){
            throw error;
        }
    },

    salesCountByMonth: async function(targetMonth){
        try{
            const result = await db.OrderMain.findOne({
                attributes: [
                    [sequelize.fn('month', sequelize.col("order_date")), 'month'],
                    [sequelize.fn('count', sequelize.col("order_id")), 'count']
                ],
                where: {
                    [Op.and]: [
                      sequelize.where(sequelize.fn('month', sequelize.col('order_date')), targetMonth)
                    ]
                }
            });
            return result.dataValues;
        }catch(error){
            throw error;
        }
    }


};