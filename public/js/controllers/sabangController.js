angular.module("app")
    .controller("sabangController", function($rootScope ,$scope, sabangService,$window){
        $scope.$on("$routeChangeSuccess", () => {
            $scope.getList(1);
        });

        $scope.sabang_state = "판매중";
        $scope.sabang_states = ["판매준비중","판매중","판매중지"];
        $scope.view = "list";
        $scope.getView = () => {
            switch($scope.view){
                case "list": return "views/sabang_m/sabang_m_list.html";
                case "create": return "views/sabang_m/sabang_m_create.html";
                case "read": return "views/sabang_m/sabang_m_read.html"; 
                case "update": return "views/sabang_m/sabang_m_update.html";

                case "createProduct": return "views/sabang_m/sabang_m_detail_create.html";
                case "updateProduct": return "views/sabang_m/sabang_m_detail_update.html";
            }
        };

        $scope.getState = () => {
            switch($scope.sabang_state){
                case "판매준비중":
                    $scope.sabang_state = "판매준비중";
                case "판매중":
                    $scope.sabang_state = "판매중";
                case "판매중지":
                    $scope.sabang_state = "판매중지";
            }
        };
        $scope.getList = (pageNo) => {
            sabangService.list(pageNo)
                .then((response) => {
                    // 정렬 
                    $scope.pager = response.data.pager;
                    $scope.sabangBuyList = response.data.sabangBuyList;
                    $scope.sabangViewList = response.data.sabangViewList;
                    $scope.sabangHighList = response.data.sabangHighList;
                    $scope.sabangLowList = response.data.sabangLowList;

                    // 필터링 
                    $scope.sabangSaleingPager = response.data.sabangSaleingPager;
                    $scope.sabangSaleReadyPager = response.data.sabangSaleReadyPager;
                    $scope.sabangSaleStopPager = response.data.sabangSaleStopPager;
                    $scope.sabangSaleingList = response.data.sabangSaleingList;
                    $scope.sabangSaleReadyList = response.data.sabangSaleReadyList;
                    $scope.sabangSaleStopList = response.data.sabangSaleStopList;

                    $scope.pageRange = [];
                    for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++){
                        $scope.pageRange.push(i)
                    }

                    if(response.data.sabangSaleingPager){
                        $scope.sabangSaleingPager = response.data.sabangSaleingPager;
                        $scope.sabangSaleReadyPager = response.data.sabangSaleReadyPager;
                        $scope.sabangSaleStopPager = response.data.sabangSaleStopPager;
      
                        $scope.sabangViewList = response.data.sabangViewList;
                        $scope.sabangHighList = response.data.sabangHighList;
                        $scope.sabangLowList = response.data.sabangLowList;
                        $scope.sabangSaleingList = response.data.sabangSaleingList;
                        $scope.sabangSaleReadyList = response.data.sabangSaleReadyList;
                        $scope.sabangSaleStopList = response.data.sabangSaleStopList;

                        $scope.sabangSaleingpageRange = [];
                        for(var i=$scope.sabangSaleingPager.startPageNo; i<=$scope.sabangSaleingPager.endPageNo; i++){
                            $scope.sabangSaleingpageRange.push(i)
                        }
    
                        $scope.sabangSalereadypageRange = [];
                        for(var i=$scope.sabangSaleReadyPager.startPageNo; i<=$scope.sabangSaleReadyPager.endPageNo; i++){
                            $scope.sabangSalereadypageRange.push(i)
                        }
    
                        $scope.sabangSalestoppageRange = [];
                        for(var i=$scope.sabangSaleStopPager.startPageNo; i<=$scope.sabangSaleStopPager.endPageNo; i++){
                            $scope.sabangSalestoppageRange.push(i)
                        }
                    }

                    $scope.view = "list";
                });
        };

       
        $scope.sabang_sort = "구매수";
        $scope.sabang_sorts=["재고상태", "구매수", "조회수", "높은 가격순", "낮은 가격순"];

        $scope.package_state = "판매중";
        $scope.package_states = ["판매중","판매준비중","판매중지"];

        //$scope.getList(1);
        $scope.read = (sabang_id) =>{
            console.log("Angular - read() 진입 --------");
            console.log("sabang_id: ", sabang_id);
            sabangService.read(sabang_id)
                .then((response) => {
                    $scope.sabang = response.data.sabang;
                    $scope.productlist = response.data.productlist;
                    $scope.view = "read";
                });
        };
        $scope.createSabangForm = () => {
            $scope.sabang = null;
            $scope.view = "create";
        };
        $scope.createSabang = (sabang, event) => {
            event.preventDefault();
            var sattach = $("#sattach")[0].files[0];
            if(sabang && sabang.sabang_name && sattach){
                var formData = new FormData();

                formData.append("sabang_name", sabang.sabang_name);
                formData.append("sabang_price", 0);
                formData.append("sabang_saleprice", 0);

                formData.append("sabang_buycount", 0);
                formData.append("sabang_viewcount", 0);
                formData.append("sabang_state", "판매준비중");

                // 파일 첨부 
                formData.append("sattach", sattach);
                
                sabangService.createSabang(formData)
                    .then((response) => {
                        $scope.getList(1);
                        $scope.view = "list";
                    });
            }
        };
        $scope.updateSabangForm = () => {
            $scope.view = "update";
        };
        $scope.updateSabang = (sabang) => {
            
            if(sabang.sabang_name && sabang.sabang_price){
                var formData = new FormData();
                formData.append("sabang_id", sabang.sabang_id);
                formData.append("sabang_name", sabang.sabang_name);
                if(sabang.sabang_price){
                    formData.append("sabang_price", sabang.sabang_price);

                } else {
                    formData.append("sabang_price", 0);
                }
                if(sabang.sabang_saleprice){
                    formData.append("sabang_saleprice", sabang.sabang_saleprice);

                } else {
                    formData.append("sabang_saleprice", 0);
                }
                formData.append("sabang_buycount", sabang.sabang_buycount);
                formData.append("sabang_viewcount", sabang.sabang_viewcount);
                formData.append("sabang_state", $("#sabang_state option:selected").val().substr(7));

                // 파일 첨부 
                var sattach = $("#sattach")[0].files[0];
                if(sattach){
                    formData.append("sattach", sattach);
                }
                sabangService.updateSabang(formData)
                    .then((response) => {
                        $scope.getList(1);
                        $scope.view = "list";
                    });
            }
        };
        $scope.sattachUrl = (sabang_id) => {
            console.log("컨트롤러, 서버로 부터 응답온 것은? : ", sabangService.sattachUrl(sabang_id));

            return sabangService.sattachUrl(sabang_id);
        };

        $scope.pattachUrl = (product_id) => {
            return sabangService.pattachUrl(product_id);
        };

        $scope.cancel = () => {
            $scope.getList($scope.pager.pageNo);
            $scope.view = "list";
        };
        $scope.cancelUpdate = (sabang_id) => {
            sabangService.read(sabang_id)
                .then((response) => {
                    $scope.sabang = response.data.sabang;
                    $scope.productlist = response.data.productlist;
                    $scope.view = "read";
                });
        };

        //사방 패키지 삭제
        // 삭제 전 확인 - 정말 삭제하시겠습니까 
        $scope.checkSabang = (sabang_id,sabang_name,pageNo) => {
            var result = $window.confirm("정말" + sabang_name +" 삭제하시겠습니까?");
            if(result){
                $scope.deleteSabang(sabang_id,pageNo);
            }
        };
        // 사방 삭제하기 
        $scope.deleteSabang = (sabang_id,pageNo) => {
            sabangService.deleteSabang(sabang_id)
                .then(() => {
                    console.log("----sabangController------");
                    $scope.getList(pageNo);
                });
        };
        
        // 상품 추가
        $scope.createProductForm = () => {
            $scope.product = null;
            $scope.view = "createProduct";
        };

        $scope.createProduct = (product) => {
            var pattach = $("#pattach")[0].files[0];
            if(product && product.product_name && product.product_price && pattach){
                var formData = new FormData();

                formData.append("product_name", product.product_name);
                formData.append("sabang_id", product.sabang_id);
                formData.append("product_price", product.product_price);
                formData.append("product_buycount", 0);
                formData.append("product_explain1", product.product_explain1);
                formData.append("product_explain2", product.product_explain2);

                // 파일 첨부 
                formData.append("pattach", pattach);
                
                sabangService.createProduct(formData)
                .then((response) => {
                    $scope.read(response.data.sabang_id);
                });
            }
        };

        // 상품 갱신
        $scope.updateProductForm = (product) => {
            $scope.product = product;
            $scope.view = "updateProduct";
        };

        $scope.updateProduct = (product) => {
            
            if(product && product.product_name && product.product_price){
                var formData = new FormData();
                formData.append("product_id", product.product_id);
                formData.append("sabang_id", product.sabang_id);
                formData.append("product_name", product.product_name);
                formData.append("product_price", product.product_price);
                formData.append("product_explain1", product.product_explain1);
                formData.append("product_explain2", product.product_explain2);

                // 파일 첨부 
                var pattach = $("#pattach")[0].files[0];
                if(pattach){
                    formData.append("pattach", pattach);
                }
                
                sabangService.updateProduct(formData)
                    .then((response) => {
                        $scope.read(response.data.sabang_id);
                    });
            }
        };

        // 삭제 전 확인 - 정말 삭제하시겠습니까 
        $scope.checkProduct = (product) => {
            console.log("check");
            console.log(""+product.product_id);
            console.log(""+product.sabang_id);
            console.log(product.product_name);
            console.log(""+product.product_price);
            var result = $window.confirm("정말" + product.product_name +" 삭제하시겠습니까?");

            if(result){
                console.log("check2");
                $scope.deleteProduct(product.product_id,product.sabang_id);
            }
        };
        // 사방 삭제하기 
        $scope.deleteProduct = (product_id,sabang_id) => {
            sabangService.deleteProduct(product_id)
                .then(() => {
                    console.log("success");
                    $scope.read(sabang_id);
                });
        };
        
    });