angular.module("app")
    .factory("authService", function($http){
        //변수 선언
        const BASE_URL = "http://localhost:8089/auth";
        //서비스 객체 리턴
        return {
            login: function(user) {
                //json으로 본문에 들어감
                console.log("angular에서 지금 서버로 요청 보낸다!!");
                console.log("user: ", user);
                const promise = $http.post(BASE_URL + "/login" , user); 
                return promise;
            }
        }
    });