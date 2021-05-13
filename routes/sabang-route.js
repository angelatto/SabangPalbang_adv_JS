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
    try{
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
        /* 4가지 정렬 카테고리  */
        const totalRows = await sabangService.totalRows();
        const pager = paging.init(6, 5, pageNo, totalRows);
        const sabangBuyList = await sabangService.list(pager);
        const sabangViewList = await sabangService.list(pager, 'view');
        const sabangHighList = await sabangService.list(pager, 'high');
        const sabangLowList = await sabangService.list(pager, 'low');
        /* 4가지 필터링 카테고리  */

        // 응답 JSON 
        res.json({pager, sabangBuyList, sabangViewList, sabangHighList, sabangLowList});
    }catch(error){
        console.log("--------------------err: ", error.message);
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
        const sabang_body = req.body;
        sabang_body.sabang_imgoname = req.file.originalname;
        sabang_body.sabang_imgsname = req.file.filename;
        sabang_body.sabang_imgtype = req.file.mimetype;
        // console.log("file:  ", req.file);
        const sabang = await sabangService.create(sabang_body);
        res.json({sabang});
    }catch(error){
        next(error);
    }
});

// 사방 수정 
router.put("", multipartFormData.single("sattach"), async (req, res, next)=> {
    console.log("------------- 수정----------------------: ");
    /*
    왜 처음 수정 시에 가격을 수정해야만 폼이 넘어가지?? 고쳐야 할 점 !!
    그런데 수정 후에는 또 수정안해도 됨 
     */
    try{
        const sabang = req.body;
        if(sabang.sabang_imgoname != null){
            sabang.sabang_imgoname = req.file.originalname;
            sabang.sabang_imgsname = req.file.filename;
            sabang.sabang_imgtype = req.file.mimetype;
        }
        await sabangService.update(sabang);
        // 정상 응답
        res.end();
    }catch(error){
        next(error);
    }
});

// 사방 삭제 
router.delete("/:sabang_id", async (req, res, next)=> {
    try{
        const sabang_id = parseInt(req.params.sabang_id);
        await sabangService.delete(sabang_id);
        // 정상 응답 
        res.end();
    }catch(error){
        next(error);
    }
});

//-------------------------------------------------------
// 상품 등록 
router.post("/detail", multipartFormData.single("pattach"), async (req, res, next)=> {
    try{
        const product_body = req.body;
        product_body.product_imgoname = req.file.originalname;
        product_body.product_imgsname = req.file.filename;
        product_body.product_imgtype = req.file.mimetype;

        // 상품 테이블 삽입 및 사방 테이블 가격 갱신 
        const product = await sabangService.createProduct(product_body);
        res.json(product);
    }catch(error){
        next(error);
    }
});

// 상품 수정
router.put("/detail", multipartFormData.single("pattach"), async (req, res, next)=> {
    try{
        const product = req.body;
        if(product.product_imgoname != null){
            product.product_imgoname = req.file.originalname;
            product.product_imgsname = req.file.filename;
            product.product_imgtype = req.file.mimetype;
        }

        // 수정 전 디비 오리지날 데이터 가져오기 - 차액을 구하기 위함 
        const origin_product = await sabangService.getProduct(parseInt(product.product_id));
        const updatePrice = parseInt(product.product_price) - origin_product.dataValues.product_price;
        console.log("차액만큼 사방에 넣어줘야 함 : ", updatePrice);

        // 상품 테이블 갱신 및 사방 테이블 가격 갱신 
        await sabangService.updateProduct(product, updatePrice);

        // 응답 - 프론트에서 응답으로 객체를 요구하니까 주는것이고, 사실은 줄 필요 없어 보임
        // 왜냐하면 파라미터로 넘겨받은 객체와 같기 때문이다. 
        res.json(product);
    }catch(error){
        next(error);
    }
});


// 상품 삭제 
router.delete("/detail/:product_id", async (req, res, next)=> {
    try{
        const product_id = parseInt(req.params.product_id);
        const product = await sabangService.getProduct(product_id);

        // 상품 테이블 삭제 및 사방 테이블 가격 갱신 
        await sabangService.deleteProduct(product);
        // 정상 응답 
        res.end();
    }catch(error){
        next(error);
    }
});

module.exports = router;