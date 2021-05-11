// 모듈 가져오기 
const express = require("express");
const sabangService = require("../services/sabang-service");
const paging = require("../utils/paging");
const fs = require("fs");
const multipartFormData = require("../utils/multipart-form-data");

// Router 객체 생성 - 스프링에서 컨트롤러 객체와 비슷한 의미 
const router = express.Router();

// 요청 매핑하기 
// 사방 목록 보여주기 
router.get("", async (req, res, next)=> {
    console.log("사방 목록 보여주는 라우터 진입");
    try{
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        console.log("사방 pageNo: ", pageNo);
        const totalRows = await sabangService.totalRows();
        console.log("사방 totalRows: ", totalRows);

        const pager = paging.init(5, 5, pageNo, totalRows);
        const sabangBuyList = await sabangService.list(pager);

        // 응답 JSON 
        res.json({pager, sabangBuyList});
    }catch(error){
        next(error);
    }
});

// 목록에서 클릭 시 -> 사방 패키지 보여줌 
router.get("/:sabang_id", async (req, res, next)=> {
    try{
        const sabang_id = parseInt(req.params.sabang_id);
        const sabang = await sabangService.getSabang(sabang_id);

        // 관계 설정 필요한 부분 ??? 
        const productlist = await sabangService.getProducts(sabang_id);
        console.log("productlist", productlist);

        // 응답 JSON 
        res.json({sabang, productlist});
    }catch(error){
        next(error);
    }
});

// 사방 패키지 이미지 출력 
router.get("/sattach/:sabang_id", async (req, res, next)=> {
    try{
        console.log("sabang router 이미지 출력 진입 ");
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

// 사방 상품 이미지 출력 
router.get("/pattach/:product_id", async (req, res, next)=> {
    try{
        console.log("product router 이미지 출력 진입 ");
        const product_id = parseInt(req.params.product_id);
        const product = await sabangService.getProduct(product_id);
        const pattachoname = product.dataValues.product_imgoname;
        if(pattachoname != null){
            const pattachsname = product.dataValues.product_imgsname;
            const pattachspath = process.env.IMG_URL + "sabang_detail/" + pattachsname;
            const pattachtype = product.dataValues.product_imgtype;
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

//-------------------------------------------------------
// 사방 등록 
router.post("", multipartFormData.single("sattach"), async (req, res, next)=> {
    try{
        console.log("사방 등록 라우터 진입-------------------------");
        const sabang_body = req.body;
        sabang_body.sabang_imgoname = req.file.originalname;
        sabang_body.sabang_imgsname = req.file.filename;
        sabang_body.sabang_imgtype = req.file.mimetype;

        console.log("file:  ", req.file);
        const sabang = await sabangService.create(sabang_body);
        console.log("디비에 삽입 후: ", sabang);
        res.json({sabang});
        res.end();
    }catch(error){
        next(error);
    }
});

// 사방 수정 
router.put("", async (req, res, next)=> {
    try{
     

        // 응답 JSON 
        res.json({});
    }catch(error){
        next(error);
    }
});

// 사방 삭제 
router.delete("/:sabang_id", async (req, res, next)=> {
    try{
        const sabang_id = parseInt(req.params.sabang_id);

        // 응답 JSON 
        res.json({});
    }catch(error){
        next(error);
    }
});

//-------------------------------------------------------
// 상품 등록 
router.post("", async (req, res, next)=> {
    try{
    

        // 응답 JSON 
        res.json({});
    }catch(error){
        next(error);
    }
});

// 상품 수정 
router.put("", async (req, res, next)=> {
    try{
    
        // 응답 JSON 
        res.json({});
    }catch(error){
        next(error);
    }
});

// 상품 삭제 
router.delete("/:sabang_id", async (req, res, next)=> {
    try{

        // 응답 JSON 
        res.json({});
    }catch(error){
        next(error);
    }
});

module.exports = router;