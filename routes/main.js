// 모듈 가져오기 
const express = require("express");

// Router 객체 생성 - 스프링에서 컨트롤러 객체와 비슷한 의미 
const router = express.Router();

// 요청 매핑하기 
router.get("", (req, res)=> {
    res.sendFile(__dirname + "/../public/index.html");
});
 
module.exports = router;
