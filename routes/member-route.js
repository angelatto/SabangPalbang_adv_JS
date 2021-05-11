// 모듈 가져오기 
const express = require("express");
const memberService = require("../services/member-service");
const paging = require("../utils/paging");

// Router 객체 생성 - 스프링에서 컨트롤러 객체와 비슷한 의미 
const router = express.Router();

// 요청 매핑하기 
router.get("", async (req, res, next)=> {
    try{
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        console.log("pageNo: ", pageNo);
        const totalRows = await memberService.totalRows();
        console.log("totalRows: ", totalRows);

        const pager = paging.init(5, 5, pageNo, totalRows);
        const members = await memberService.list(pager);
        
        
        // 응답 JSON 
        res.status(200);
        res.json({pager, members});
    }catch(error){
        next(error);
    }
   
});

module.exports = router;
