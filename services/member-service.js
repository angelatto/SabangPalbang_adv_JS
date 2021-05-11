const db = require("../sequelize/models");
const bcrypt = require("bcrypt");

module.exports = {
    create: async function(user){
        try{
            // user.userpassword = await bcrypt.hash(user.userpassword, 12); // 암호화 (평문, 암호화횟수)
            // user.userauthority = "ROLE_USER";
            // user.userenabled = 1;
            // const dbUser = await db.User.create(user); 
            // return dbUser;
            /*
             MyBatis는 insert후에 결과값이 저장된 행 수를 의미하지만, 
             Sequelize는 자동 증가된(auto increment)값이 저장된 데이터 행이 결과로 나온다. 
             */
        }catch(error){
            throw error;
        }
    },

    login: async function(user){
        try{
            const dbUser = await db.User.findOne({
                where: {userid: user.userid}
            }); 
            let result = {};
            if(dbUser){
                const passwordCheck = await bcrypt.compare(user.userpassword, dbUser.userpassword);
                if(passwordCheck){
                    result = {id:"success", message: "로그인 성공 "};
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