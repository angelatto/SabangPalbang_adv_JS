angular.module("app")
    .controller("orderController", function($rootScope ,$scope, orderService){
        $scope.$on("$routeChangeSuccess", () => {
            $scope.getList(1);
        });

        $scope.view = "list";
        $scope.getView = () => {
            switch($scope.view){
                case "list": return "views/order_m/order_m_list.html";
                case "read": return "views/order_m/order_m_read.html"; 
                case "update": return "views/order_m/order_m_update.html"; 
            }
        };
        $scope.getList = (pageNo) => {
            orderService.list(pageNo)
                .then((response) => {
                    $scope.pager = response.data.pager;
                    $scope.waitForPaypager = response.data.waitForPaypager;
                    $scope.paySuccesspager = response.data.paySuccesspager;
                    $scope.postReadypager = response.data.postReadypager;
                    $scope.postingpager = response.data.postingpager;
                    $scope.postSuccesspager = response.data.postSuccesspager;
                    $scope.orders = response.data.orders;
                    $scope.dateUpList = response.data.dateUpList;
                    $scope.dateDownList = response.data.dateDownList;
                    $scope.waitForPayList = response.data.waitForPayList;
                    $scope.paySuccessList = response.data.paySuccessList;
                    $scope.postReadyList = response.data.postReadyList;
                    $scope.postingList = response.data.postingList;
                    $scope.postSuccessList = response.data.postSuccessList;
                    $scope.pageRange = [];
                    for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++){
                        $scope.pageRange.push(i)
                    }

                    $scope.waitForPaypageRange = [];
                    for(var i=$scope.waitForPaypager.startPageNo; i<=$scope.waitForPaypager.endPageNo; i++){
                        $scope.waitForPaypageRange.push(i)
                    }

                    $scope.paySuccesspageRange = [];
                    for(var i=$scope.paySuccesspager.startPageNo; i<=$scope.paySuccesspager.endPageNo; i++){
                        $scope.paySuccesspageRange.push(i)
                    }

                    $scope.postReadypageRange = [];
                    for(var i=$scope.postReadypager.startPageNo; i<=$scope.postReadypager.endPageNo; i++){
                        $scope.postReadypageRange.push(i)
                    }

                    $scope.postingpageRange = [];
                    for(var i=$scope.postingpager.startPageNo; i<=$scope.postingpager.endPageNo; i++){
                        $scope.postingpageRange.push(i)
                    }

                    $scope.postSuccesspageRange = [];
                    for(var i=$scope.postSuccesspager.startPageNo; i<=$scope.postSuccesspager.endPageNo; i++){
                        $scope.postSuccesspageRange.push(i)
                    }

                    $scope.view = "list";
                });
        };

        $scope.read = (order_id) =>{
            orderService.read(order_id)
                .then((response) => {
                    $scope.order = response.data;
                    $scope.Memail = response.data.Member;
                    $scope.view = "read";
                });
        };

        $scope.updateOrderForm = () =>{
            $scope.view = "update";
        };

        $scope.updateOrder = (order) => {
                let jsonData = {};
                jsonData.order_id = order.order_id;
                jsonData.order_zipcode = $("#zipcode").val();
                jsonData.order_roadaddress = $("#roadaddress").val();
                jsonData.order_detailaddress = $("#detailaddress").val();
                jsonData.order_state = order.order_state;
                jsonData.order_phone = order.order_phone;
                orderService.update(jsonData)
                .then(() => {
                    $scope.read(order.order_id);
                    $scope.view = "read";
                })
            
        };

        $scope.getState = () => {
            switch($scope.order_state){
                case "???????????????":
                    $scope.order_state = "???????????????";
                case "????????????":
                    $scope.order_state = "????????????";
                case "???????????????":
                    $scope.order_state = "???????????????";
                case "?????????":
                    $scope.order_state = "?????????";
                case "????????????":
                    $scope.order_state = "????????????";
            }
        };

        $scope.deleteOrder = (order_id) => {
            orderService.delete(order_id)
            .then((response) => {
                $scope.getList(1);
                $scope.view = "list";
            });
        };

        $scope.cancel = () => {
            $scope.getList($scope.pager.pageNo);
            $scope.view = "list";
        };
        
        $scope.kindVal = "????????????";
        $scope.kindList=["????????????", "????????????", "??????"];
        $scope.onSelect1 = (status) => {
            $scope.kindVal = status;
            $scope.getList(1);
            $scope.view = "list";
        };

        $scope.order_state = "???????????????";
        $scope.order_states = ["???????????????","????????????","???????????????", "?????????", "????????????"];
        $scope.onSelect2 = (status) => {
            $scope.order_state = status;
            $scope.getList(1);
            $scope.view = "list";
        };

        $scope.date_state = "????????? ???"
        $scope.date_states = ["?????? ???", "????????? ???"];
        $scope.onSelect3 = (status) => {
            $scope.date_state = status;
            $scope.getList(1);
            $scope.view = "list";
        };
       
        $scope.sattachUrl = (sabang_id) => {
            return orderService.sattachUrl(sabang_id);
        };

        $scope.pattachUrl = (product_id) => {
            return orderService.pattachUrl(product_id);
        };
    });