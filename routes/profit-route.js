// 모듈 가져오기 
const express = require("express");
const profitService = require("../services/profit-service");
const sabangService = require("../services/sabang-service");
const palbangService = require("../services/palbang-service");
const fs = require("fs");

// Router 객체 생성 - 스프링에서 컨트롤러 객체와 비슷한 의미 
const router = express.Router();

// 요청 매핑하기 
/* 회원 실적 */
router.get("/member", async (req, res, next)=> {
    try{
        const totalMemberNum = await profitService.getMemberCount();  // 총 회원수 
        const recentJoinNum = await profitService.getRecentJoinCount(); // 최근 한 달간 가입한 회원수 
        const buyMemberNum = await profitService.getBuyMemberCount(); // 실구매 회원수 
        const vipMembers = await profitService.getVipMembers(); // list - 우수 고객 top5 (주문 횟수 기준)
        const influencers = await profitService.getInfluencers(); // list - 인플루언서 고객 top5 (팔방 작성 횟수 기준)
        
        // 넘겨줄 배열 새로 만들기 
        const resultVipMembers = [];
        for(member of vipMembers){
            resultVipMembers.push(member.dataValues.Member.dataValues);
        }
        const resultInfluencers = [];
        for(member of influencers){
            resultInfluencers.push(member.dataValues.Member.dataValues);
        }

        // 응답 JSON 
        res.json({totalMemberNum, recentJoinNum, buyMemberNum, 
            vipMembers:resultVipMembers, influencers:resultInfluencers});
    }catch(error){
        console.log("err123: ", error.message);
        next(error);
    }
});

/* 사방 실적  */
router.get("/sabang", async (req, res, next)=> {
    try{
        const BestSabang = await profitService.getBestSabang();
        const BestProduct = await profitService.getBestProduct();
        const BestPalbang = await profitService.getBestPalbang();
        
        // res.end();
        res.json({BestSabang, BestProduct, BestPalbang});
    }catch(error){
        console.log("err123: ", error.message);
        next(error);
    }
});

/* 이미지 출력 API */
// 사방 패키지 이미지 출력 
router.get("/sabang/sattach/:sabang_id", async (req, res, next)=> {
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
router.get("/sabang/pattach/:product_id", async (req, res, next)=> {
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

// 팔방 썸네일 이미지 출력 
router.get("/sabang/palattach/:palbang_id", async(req, res, next) => {
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

/* 주문 실적 */
router.get("/order", async (req, res, next)=> {
    try{
        // 1. 누적 판매량 
        const totalCount = await profitService.totalCount();
        const sumtotalprice = await profitService.sumtotalprice();
        
        // 2. 최근 3달 판매량 - 배열로 한번에 보냄 
        const currMonth = new Date().getMonth()+1; // 5월 - 현재month
        const allTotalSales = [];
        for(let i=0; i<3; i++){
            const totalSales = await profitService.totalpriceByMonth(currMonth-i);  
            allTotalSales.push(totalSales);
        }

        // 3. 최근 3달 주문 수 - 배열로 한번에 보냄 
        const allSalesCount = [];
        for(let i=0; i<3; i++){
            const salesCount = await profitService.salesCountByMonth(currMonth-i);  
            allSalesCount.push(salesCount);
        }

        // 4. 결제방식 
        const cardpaycount = await profitService.paycount('payByCard');
        const depositpaycount = await profitService.paycount('payByDeposit');
        const phonepaycount = await profitService.paycount('payByPhone');

        // 응답 
        res.json({totalCount, sumtotalprice, 
                cardpaycount, depositpaycount, phonepaycount,
                allTotalSales, allSalesCount});
    }catch(error){
        next(error);
    }
});


module.exports = router;
