// 모듈 가져오기 
const express = require("express");
const sabangService = require("../services/sabang-service");
const orderService = require("../services/order-service");
const paging = require("../utils/paging");
const fs = require("fs");

// Router 객체 생성 - 스프링에서 컨트롤러 객체와 비슷한 의미 
const router = express.Router();

// 요청 매핑하기 
// 전체 리스트 출력 
router.get("", async (req, res, next)=> {
    try{
        const pageNo = req.query.pageNo? parseInt(req.query.pageNo): 1;
        const totalRows = await orderService.totalRows();
        // console.log("total: ", totalRows);
        const pager = paging.init(10, 5, pageNo, totalRows);
        
        // 리스트 정렬 조건 만들어서 파라미터로 넘겨주기 let where
        const orders = await orderService.list(pager);

        // 응답 JSON 
        res.json({pager, orders});
    }catch(error){
        next(error);
    }
});

// 상세 주문 내용 보기 
router.get("/:order_id", async (req, res, next) => {
    try{
        // 주문 아이디로 OrderMain , Member 조인해서 가져오기 - Sequelize 관계 설정 이용 
        const order_id = parseInt(req.params.order_id);
        const orderWithMember = await orderService.getOrderWithMemberInfo(order_id);
        // 응답 JSON 
        res.json(orderWithMember);
    }catch(error){
        next(error);
    }
});

// 주문 내용 업데이트 
router.put("", async (req, res, next) => {
    try{
        const order = req.body;
        await orderService.update(order);
        // 응답 JSON 
        res.end();
    }catch(error){
        next(error);
    }
});

// 주문 삭제 
router.delete("/:order_id", async (req, res, next) => {
    try{
        const order_id = parseInt(req.params.order_id);
        await orderService.delete(order_id);
        // 응답
        res.end();
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

// 사방 상품 이미지 출력 
router.get("/pattach/:product_id", async (req, res, next)=> {
    try{
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

module.exports = router;