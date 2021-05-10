angular.module("app")
    .factory("palbangService", function($http){ 
      
        const BASE_URL = "http://localhost:8089/palbang_m";
        
        return {
            list: function(pageNo=1) {
                const promise = $http.get(BASE_URL, {params:{pageNo:pageNo}});
                return promise;
            },
            read: function(palbang_id) {
                const promise = $http.get(BASE_URL + "/" + palbang_id);
                return promise;
            },
            palattachUrl: function(palbang_id) {
                return BASE_URL + "/pattach/" + palbang_id;
            },
            palDattachUrl: function(palbang_detailno) {
                return BASE_URL + "/pDattach/" + palbang_detailno;
            },
            deletePalbang: function(palbang_id) {
                const promise = $http.delete(BASE_URL + "/" + palbang_id);
                return promise;
            }
        }
    });