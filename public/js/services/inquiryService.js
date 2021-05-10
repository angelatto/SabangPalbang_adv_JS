angular.module("app")
    .factory("inquiryService", function($http){ 
      
        const BASE_URL = "http://localhost:8089/inquiry_m";
        
        return {
            sabanglist: function(pageNo=1) {
                return $http.get(BASE_URL, {params:{pageNo:pageNo}});
            },
            inquirylist: function(pageNo=1, sid, ansstate) {
                return $http.get(BASE_URL+"/"+sid, {params:{pageNo:pageNo, ansstate:ansstate}});
            },
            inquiry: function(inquiry_id){
                return $http.get(BASE_URL+"/inquiry/"+inquiry_id);
            },
            answer: function(inquiryJson){
                return $http.put(BASE_URL, inquiryJson);
            },
            delete: function(inquiry_id){
                return $http.delete(BASE_URL+"/"+inquiry_id);
            },
            sattachUrl: function(sabang_id) {
                return BASE_URL + "/sattach/" + sabang_id;
            }
        }
    });