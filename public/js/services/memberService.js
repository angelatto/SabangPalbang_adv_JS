angular.module("app")
    .factory("memberService", function($http){ 
      
        const BASE_URL = "http://localhost:8089/member_m";
        
        return {
            listMember: function(pageNo=1) {
                const promise = $http.get(BASE_URL, {params:{pageNo:pageNo}});
                return promise;
            },
            searchMemberById: function(pageNo=1, target) {
                const promise = $http.get(BASE_URL + "/id/" + target, {params:{pageNo:pageNo}});
                return promise;
            },
            searchMemberByName: function(pageNo=1, target) {
                const promise = $http.get(BASE_URL + "/name/" + target, {params:{pageNo:pageNo}});
                return promise;
            },
            deleteMember: function(member_email) {
                const promise = $http.delete(BASE_URL + "/" + member_email);
                return promise;
            }
            
        }
    });