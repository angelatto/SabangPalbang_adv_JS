angular.module("app")
    .controller("inquiryController", function($rootScope ,$scope, inquiryService, $window){
        $scope.$on("$routeChangeSuccess", () => {
            $scope.getSabangList(1);
        });

        $scope.view = "sabanglist";
        $scope.getView = () => {
            switch($scope.view){
                case "sabanglist": return "views/inquiry_m/inquiry_m_sabanglist.html";
                case "inquirylist": return "views/inquiry_m/inquiry_m_inquirylist.html";
                case "inquiry": return "views/inquiry_m/inquiry_m_update.html"; 
            }
        };
       
        $scope.getSabangList = (pageNo) => {
            inquiryService.sabanglist(pageNo)
                .then((response) => {
                    $scope.pager = response.data.pager;
                    // 정렬 
                    $scope.sabangBuyList = response.data.sabangBuyList;
                    $scope.sabangViewList = response.data.sabangViewList;
                    $scope.sabangHighList = response.data.sabangHighList;
                    $scope.sabangLowList = response.data.sabangLowList;
                   
                    $scope.pageRange = [];
                    for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++){
                        $scope.pageRange.push(i)
                    }
                    $scope.view = "sabanglist";
                });
        };

        // 정렬 조건 
        $scope.sabang_sorts=["구매수", "조회수", "높은 가격순", "낮은 가격순"];
        $scope.sabang_sort = "구매수";
        
        $scope.ansStatusList = ["전체답변", "대기중", "답변완료"];
        $scope.status = "전체답변"; //초기화 

        $scope.onSelect = (status, sid) => {
            $scope.status = status;
            $scope.getInquiryList(1, sid);
        };

        // 사방에 속한 문의 목록 가져오기 
        $scope.getInquiryList = (pageNo, sid) => {
            $scope.sid = sid;
            inquiryService.inquirylist(pageNo, sid, $scope.status)
                .then((response) => {
                    $scope.pager = response.data.pager;
                    $scope.inquirylist = response.data.inquirylist;
                    $scope.pageRange = [];
                    for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++){
                        $scope.pageRange.push(i)
                    }
                    $scope.view = "inquirylist";
                });
        };

        // 문의 내역 읽기 
        $scope.getInquiry = (inquiry_id) => {
            inquiryService.inquiry(inquiry_id)
                .then((response) => {
                    $scope.inquiry = response.data;
                    $scope.view = "inquiry";
                });
        };

        // 문의 답변 남기기 
        $scope.updateAnswer = () => {
            var inquiryJson = {
                "inquiry_id": $scope.inquiry.inquiry_id,
                "inquiry_anscontent": $scope.inquiry.inquiry_anscontent
            };
            inquiryService.answer(inquiryJson)
                .then((response) => { 
                    // 응답이 성공하면 inquiry_id를 응답으로 받는다. 
                    $scope.getInquiry(response.data);
                    $window.alert("답변이 정상적으로 등록되었습니다");
                });
        };

        // 삭제 전 확인 메세지 
        $scope.checkDelete = (inquiry_id, sid) => {
            var result = $window.confirm("정말 삭제하시겠습니까?");
            if(result){
                $scope.deleteInquiry(inquiry_id, sid);
            }else{
                $scope.getInquiryList(1, sid); 
            }
        };

        // 문의 삭제하기 
        $scope.deleteInquiry = (inquiry_id, sid) => {
            inquiryService.delete(inquiry_id)
                .then(() => {
                    $scope.getInquiryList(1, sid);
                });
        };

        $scope.sattachUrl = (sabang_id) => {
            return inquiryService.sattachUrl(sabang_id);
        };

    });