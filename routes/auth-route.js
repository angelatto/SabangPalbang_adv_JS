const express = require("express");
const authService = require("../services/auth-service");
const jwtAuth = require("../security/jwtAuth");

const router = express.Router();

router.post("/login", async (req, res, next) => {
   console.log("auth.js로 넘어옴");
   try{
      const user = req.body;
      const result = await authService.login(user);
      console.log("db 작업 완료: ", result);

      if(result.id !== "success"){ 
          res.status(401); // 인증 실패 상태 코드 
          res.json({result});
      }else{ 
         const uid = user.uid;
         console.log(uid);

         const authToken = jwtAuth.createJwt(uid);
         console.log(authToken);

         res.status(200); // 인증 성공 
         res.json({uid,authToken});
      }
  }catch(error){
      next(error);
  }
});

module.exports = router;