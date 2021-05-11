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

// 회원 삭제
router.delete("/:member_id", async (req, res, next) => {
    try{
        const member_id = parseInt(req.params.member_id);
        await memberService.delete(member_id);
        res.end();
    }catch(error){
        next(error);
    }
});

// 회원 조회 : 아이디(int)
router.get("/id/:target", async (req, res, next) => {
    try{
        const target = parseInt(req.params.target);
        
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        const searchMethod = {column: "id",target};
        const totalRows = await memberService.totalRows(searchMethod);

        const pager = paging.init(5, 5, pageNo, totalRows);
        const members = await memberService.listById(pager, target);
        
        // 응답 JSON 
        res.status(200);
        res.json({pager, members});
    }catch(error){
        next(error);
    }
});

// 회원 조회 : 이름(String)
router.get("/name/:target", async (req, res, next) => {
    try{
        const target = req.params.target;
        
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        const searchMethod = {column: "name",target};
        const totalRows = await memberService.totalRows(searchMethod);

        const pager = paging.init(5, 5, pageNo, totalRows);
        const members = await memberService.listByName(pager, target);
        
        // 응답 JSON 
        res.status(200);
        res.json({pager, members});
    }catch(error){
        next(error);
    }
});


module.exports = router;
