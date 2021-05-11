const db = require("../sequelize/models");
const bcrypt = require("bcrypt");

module.exports = {
    login: async function(user){
        try{
            const dbUser = await db.Member.findOne({
                where: {member_email: user.uid}
            }); 
            let result = {};
            if(dbUser){
                const passwordCheck = await bcrypt.compare(user.upassword, dbUser.member_pw);
                if(passwordCheck){
                    result = {id:"success", message: "로그인 성공"};
                }else{
                    result = {id:"wrongUserPassword", message: "패스워드가 틀립니다."};
                }
            }else{
                result = {id:"wrongUserId", message: "아이디가 존재하지 않습니다."};
            }
            return result;
        }catch(error){
            throw error;
        }
    }
};