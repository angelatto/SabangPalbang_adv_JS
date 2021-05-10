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
                $scope.month3 = response.data.month3;
                $scope.month2 = response.data.month2;
                $scope.month1 = response.data.month1;
                $scope.sumtotalprice = response.data.sumtotalprice;
                $scope.totalprice3 = response.data.totalprice3;
                $scope.totalprice2 = response.data.totalprice2;
                $scope.totalprice1 = response.data.totalprice1;
                $scope.totalCount = response.data.totalCount;
                $scope.threeTotalCount = response.data.threeTotalCount;
                $scope.cardpaycount = response.data.cardpaycount;
                $scope.depositpaycount = response.data.depositpaycount;
                $scope.phonepaycount = response.data.phonepaycount;
                $scope.outputThreeMonth = response.data.outputThreeMonth;
                $scope.outputTwoMonth = response.data.outputTwoMonth;
                $scope.outputOneMonth = response.data.outputOneMonth;

                $scope.totalPriceData = [
                    [$scope.totalprice3[0], $scope.totalprice2[0], $scope.totalprice1[0],23000000,25000000]
                ];
                $scope.totalNumberData = [
                    [$scope.month3, $scope.month2, $scope.month1,0]
                ];
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