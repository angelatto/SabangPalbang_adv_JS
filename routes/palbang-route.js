// 모듈 가져오기 
const express = require("express");
const palbangService = require("../services/palbang-service");
const paging = require("../utils/paging");
const fs = require("fs");

// Router 객체 생성 - 스프링에서 컨트롤러 객체와 비슷한 의미 
const router = express.Router();

// 요청 매핑하기 
// 모든 팔방 게시물 조회 
router.get("", async (req, res, next)=> {
    try{
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        const totalRows = await palbangService.totalRows();
        const pager = paging.init(6, 5, pageNo, totalRows);
        const palbangLikeList = await palbangService.list(pager); // 좋아요수
        const palbangViewList = await palbangService.list(pager, 'view'); // 조회수 
        const palbangNewList = await palbangService.list(pager, 'new'); // 최신순
        const palbangOldList = await palbangService.list(pager, 'old'); // 오래된순 

        // 응답 JSON 
        res.json({pager, palbangLikeList, palbangViewList, palbangNewList, palbangOldList});
    }catch(error){
        next(error);
    }
});

// 하나의 팔방 상세 내용 출력
router.get("/:palbang_id", async (req, res, next) => {
    try{
        const palbang_id = parseInt(req.params.palbang_id);
        const palbang = await palbangService.getPalbang(palbang_id);
        const palbanglist = await palbangService.getPalbangDetail(palbang_id);

        res.json({palbang, palbanglist});
    }catch(error){
        next(error);
    }
});

// 팔방 썸네일 이미지 출력 
router.get("/pattach/:palbang_id", async(req, res, next) => {
    try{
        const palbang_id = parseInt(req.params.palbang_id);
        const palbang = await palbangService.getPalbang(palbang_id);
        const pattachoname = palbang.dataValues.palbang_imgoname;
        if(pattachoname != null){
            const pattachsname = palbang.dataValues.palbang_imgsname;
            const pattachspath = process.env.IMG_URL + "palbang_post/" + pattachsname;
            const pattachtype = palbang.dataValues.palbang_imgtype;
            // 이미지 출력 
            fs.readFile(pattachspath, function(error, data){
                res.writeHead(200,{'Content': pattachtype});
                res.end(data);
            });
        }
    }catch(error){
        next(error);
    }
});

// 팔방 디테일 이미지 출력 
router.get("/pDattach/:palbang_detailno", async(req, res, next) => {
    try{
        const palbang_detailno = parseInt(req.params.palbang_detailno);
        const palbang_detail = await palbangService.getPalbangDetailByNo(palbang_detailno);
        const pattachoname = palbang_detail.dataValues.palbang_dimgoname;
        if(pattachoname != null){
            const pattachsname = palbang_detail.dataValues.palbang_dimgsname;
            const pattachspath = process.env.IMG_URL + "palbang_detail/" + pattachsname;
            const pattachtype = palbang_detail.dataValues.palbang_dimgtype;
            // 이미지 출력 
            fs.readFile(pattachspath, function(error, data){
                res.writeHead(200,{'Content': pattachtype});
                res.end(data);
            });
        }
    }catch(error){
        next(error);
    }
});

// 팔방 게시물 삭제 
router.delete("/:palbang_id", async (req, res, next) => {
    try{
        const palbang_id = parseInt(req.params.palbang_id);
        await palbangService.delete(palbang_id);
        res.end();
    }catch(error){
        next(error);
    }
});

module.exports = router;
