angular.module("app")
    .controller("palbangController", function($rootScope ,$scope, palbangService,$window){
        $scope.$on("$routeChangeSuccess", () => {
            $scope.getList(1);
        });

        $scope.view = "list";
        $scope.getView = () => {
            switch($scope.view){
                case "list": return "views/palbang_m/palbang_m_list.html";
                case "read": return "views/palbang_m/palbang_m_read.html"; 
            }
        };
        $scope.getList = (pageNo) => {
            palbangService.list(pageNo)
                .then((response) => {
                    $scope.pager = response.data.pager;
                    $scope.palbangLikeList = response.data.palbangLikeList;
                    $scope.palbangViewList = response.data.palbangViewList;
                    $scope.palbangNewList = response.data.palbangNewList;
                    $scope.palbangOldList = response.data.palbangOldList;
                    $scope.pageRange = [];
                    for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++){
                        $scope.pageRange.push(i)
                    }
                    $scope.view = "list";
                });
        };

        //팔방 정렬

        $scope.palbang_sort = "좋아요 수";
        $scope.palbang_sorts = ["좋아요 수", "조회수", "최신 순", "오래된 순"];


        $scope.read = (palbang_id) =>{
            palbangService.read(palbang_id)
                .then((response) => {
                    $scope.palbang = response.data.palbang;
                    $scope.palbanglist = response.data.palbanglist;
                    $scope.view = "read";
                });
        };
        $scope.palattachUrl = (palbang_id) => {
            return palbangService.palattachUrl(palbang_id);
        };

        $scope.palDattachUrl = (palbang_detailno) => {
            return palbangService.palDattachUrl(palbang_detailno);
        };
         // 삭제 전 확인 - 정말 삭제하시겠습니까 
         $scope.checkDelete = (palbang_id,palbang_title,pageNo) => {
            var result = $window.confirm("정말" + palbang_title +" 삭제하시겠습니까?");
            if(result){
                $scope.deletePalbang(palbang_id,pageNo);
            }
        };
        // 팔방 삭제하기 
        $scope.deletePalbang = (palbang_id,pageNo) => {
            palbangService.deletePalbang(palbang_id)
                .then(() => {
                    $scope.getList(pageNo);
                });
        };
    });