// 모듈 가져오기 
const express = require("express");
const sabangService = require("../services/sabang-service");
const inquiryService = require("../services/inquiry-service");
const paging = require("../utils/paging");
const fs = require("fs");
const multipartFormData = require("../utils/multipart-form-data");

// Router 객체 생성 - 스프링에서 컨트롤러 객체와 비슷한 의미 
const router = express.Router();

// 요청 매핑하기 
// 사방 목록 보여주기 
router.get("", async (req, res, next)=> {
    try{
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        const totalRows = await sabangService.totalRows();
        const pager = paging.init(6, 5, pageNo, totalRows);
        const sabangBuyList = await sabangService.list(pager);
        for(let i in sabangBuyList){
            const sid = sabangBuyList[i].dataValues.sabang_id;
            const totalInquiryNum = await inquiryService.totalRows(sid);
            const noAnsInquiryNum = await inquiryService.getNoAnsCount(sid);
            sabangBuyList[i].dataValues.totalInquiryNum = totalInquiryNum;
            sabangBuyList[i].dataValues.noAnsInquiryNum = noAnsInquiryNum;
        }

        // 응답 JSON 
        res.json({pager, sabangBuyList});
    }catch(error){
        next(error);
    }
});

// 사방 패키지 이미지 출력 
router.get("/sattach/:sabang_id", async (req, res, next)=> {
    try{
        const sabang_id = parseInt(req.params.sabang_id);
        const sabang = await sabangService.getSabang(sabang_id);
        const sattachoname = sabang.dataValues.sabang_imgoname;
        if(sattachoname != null){
            const sattachsname = sabang.dataValues.sabang_imgsname;
            const sattachspath = process.env.IMG_URL + "sabang_post/" + sattachsname;
            const sattachtype = sabang.dataValues.sabang_imgtype;
            // 이미지 출력 
            fs.readFile(sattachspath, function(error, data){
                res.writeHead(200,{'Content': sattachtype});
                res.end(data);
            });
        }
    }catch(error){
        next(error);
    }
});

// 사방에 대한 문의 목록 
router.get("/:sid", async (req, res, next)=> {
    try{
        const sid = parseInt(req.params.sid);
        const ansstate = req.query.ansstate; // 전체답변, 대기중, 답변완료 
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        const totalRows = await inquiryService.totalRows(sid, ansstate);
        const pager = paging.init(10, 5, pageNo, totalRows);
        const inquirylist = await inquiryService.list(pager, sid, ansstate);
    
        // 응답 JSON 
        res.json({pager, inquirylist});
    }catch(error){
        next(error);
    }
});

// 하나의 문의 내용 읽기 
router.get("/inquiry/:inquiry_id", async (req, res, next) => {
    try{
        const inquiry_id = parseInt(req.params.inquiry_id);
        const inquiry = await inquiryService.getInquiry(inquiry_id);
        // 응답 JSON 
        res.json({inquiry});
    }catch(error){
        next(error);
    }
});

// 문의 삭제 
router.delete("/:inquiry_id", async (req, res, next) => {
    try{
        const inquiry_id = parseInt(req.params.inquiry_id);
        await inquiryService.delete(inquiry_id);
        // 삭제 성공 시 응답할 데이터는 없음
        res.end();
    }catch(error){
        next(error);
    }
});

// 문의 답변 남기기 
router.put("", async (req, res, next) => {
    try{
        const inquiry = req.body;
        await inquiryService.update(inquiry.inquiry_anscontent, parseInt(inquiry.inquiry_id));
        // 데이터를 응답으로 보냄
        res.json({inquiry_id : inquiry.inquiry_id});
    }catch(error){
        next(error);
    }
});

module.exports = router;
