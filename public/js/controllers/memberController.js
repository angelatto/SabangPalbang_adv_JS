angular.module("app")
    .controller("memberController", function($rootScope ,$scope, memberService,$window){
        $scope.$on("$routeChangeSuccess", () => {
            $scope.getList(1);
        });
        $scope.view = "list";
        $scope.getView = () => {
            switch($scope.view){
                case "list": return "views/member_m/member_m_list.html";
                case "read": return "views/member_m/member_m_read.html"; 
                case "update": return "views/member_m/member_m_update.html";
            }
        };

        // default - 전체 회원 
        $scope.getList = (pageNo) => {
            memberService.listMember(pageNo)
                .then((response) => {
                    $scope.pager_all = response.data.pager_all;
                    $scope.members = response.data.members;
                    $scope.search = "all";
                    $scope.pageRange = [];
                    for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++){
                        $scope.pageRange.push(i)
                    }
                    $scope.view = "list";
                });
        };

        // 회원 조회 리스트 
        $scope.searchMember = (pageNo, target) => {
            if(isNaN(target)){ // 이름 검색 
                memberService.searchMemberByName(pageNo, target)
                .then((response) => {
                    $scope.pager_name = response.data.pager_name;
                    $scope.members = response.data.members;
                    $scope.search = "name";
                    $scope.pageRange = [];
                    for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++){
                        $scope.pageRange.push(i)
                    }
                });
            }else{ // 아이디 검색 
                memberService.searchMemberById(pageNo, target)
                .then((response) => {
                    $scope.pager_id = response.data.pager_id;
                    $scope.members = response.data.members;
                    $scope.search = "id";
                    $scope.pageRange = [];
                    for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++){
                        $scope.pageRange.push(i)
                    }
                });
            }
        };
        
        // 삭제 전 확인 - 정말 삭제하시겠습니까 
        $scope.checkDelete = (member_id,member_email) => {
            var result = $window.confirm("정말" + member_email +"회원을 탈퇴시키겠습니까?");
            if(result){
                $scope.deleteMember(member_id);
            }else{
                $scope.getList(1); 
            }
        };
        // 회원 삭제하기 
        $scope.deleteMember = (member_id) => {
            memberService.deleteMember(member_id)
                .then(() => {
                    $scope.getList(1);
                });
        };

    });