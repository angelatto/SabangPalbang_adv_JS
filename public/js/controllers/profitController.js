angular.module("app")
    .controller("profitController", function($scope, profitService, $window, $rootScope, $location) {
        $scope.$on("$routeChangeSuccess", () => {
            $scope.showBestMember();
            $scope.showBestSabang();
            $scope.getmonthbuy(); 
        });

        //채정 - 멤버
        $scope.showBestMember = () => {
            console.log("showBestMember - controller ");
            profitService.showBestMember()
            .then((response) => {
                console.log("success");
                $scope.totalMemberNum = response.data.totalMemberNum;
                $scope.recentJoinNum = response.data.recentJoinNum;
                $scope.buyMemberNum = response.data.buyMemberNum;
                $scope.vipMembers = response.data.vipMembers; //list
                $scope.influencers = response.data.influencers; //list 

                // 채정 - 멤버 막대 그래프 
                $scope.labels_member = ['총 회원수', '최근 한달간 가입한 회원수', '실구매 회원수'];
                $scope.series_member = ['인원'];

                $scope.data_member = [
                    [$scope.totalMemberNum , $scope.recentJoinNum, $scope.buyMemberNum, 0]
                ];
                $scope.color1 = [
                    '#00ADF9'
                ];

            });
        };

         //종현 - 사방
         $scope.showBestSabang = () => {
            profitService.showBestSabang()
            .then((response) => {
                $scope.sabang = response.data.BestSabang;
                $scope.product = response.data.BestProduct;
                $scope.palbang = response.data.BestPalbang;
            });
        };
        $scope.sattachUrl = (sabang_id) => {
            return profitService.sattachUrl(sabang_id);
        };

        $scope.pattachUrl = (product_id) => {
            return profitService.pattachUrl(product_id);
        };

        $scope.palattachUrl = (palbang_id) => {
            return profitService.palattachUrl(palbang_id);
        };
        
        //민상 - 주문

        $scope.getmonthbuy = () => {
            console.log("월별판매량들어옴");
            profitService.monthbuy()
            .then((response) => {
                // 1. 누적 판매량 
                $scope.sumtotalprice = response.data.sumtotalprice;
                $scope.totalCount = response.data.totalCount;

                // 2. 최근 3달 단위 판매량 
                const allTotalSales = response.data.allTotalSales;
                console.log("allTotalSales: ", allTotalSales);
                $scope.allTotalSales = allTotalSales;

                let threeTotalCount = 0
                for(let totalSales of allTotalSales){
                    threeTotalCount += parseInt(totalSales.sum);
                }
                $scope.threeTotalCount = threeTotalCount;

                $scope.totalPriceData = [
                    [allTotalSales[0].sum, allTotalSales[1].sum, allTotalSales[2].sum, 0]
                ];

                // 3. 최근 3달 주문수 
                const allSalesCount = response.data.allSalesCount;
                console.log("allSalesCount: ", allSalesCount);
                $scope.totalNumberData = [
                    [allSalesCount[0].count, allSalesCount[1].count, allSalesCount[2].count,0]
                ];

                // 4. 결제 방식 
                $scope.cardpaycount = response.data.cardpaycount;
                $scope.depositpaycount = response.data.depositpaycount;
                $scope.phonepaycount = response.data.phonepaycount;
                $scope.payData = [
                    $scope.cardpaycount,  $scope.depositpaycount, $scope.phonepaycount
                ];
                $scope.color2 = [
                    '#00ADF9'
                ];
                $scope.color3 = [
                    '#00ADF9'
                ];
            });
        };

        $scope.monthsLabels = ['금월','전월','전전월'];
        $scope.priceSeries = ['판매금액'];
        $scope.numberSeries = ['주문건수'];
        $scope.colors = [
            '#00ADF9','#0BE324','#FFEE57'
        ];
        $scope.payLabels = ["카드","무통장","핸드폰"];
       
        
    });