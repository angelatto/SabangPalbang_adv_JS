angular.module("app")
    .controller("authController", function($scope, authService, $window, $rootScope, $location) {
        
        $scope.login = (user) => {
            authService.login(user)
            .then((response) => { // status 200 
                /*
                    응답 상태 코드가 200이면 정상 로그인 
                    응답 상태 코드가 401이면 아이디 또는 비번 틀림 
                */
                console.log("응답 코드: ", response.status);

                $rootScope.uid = response.data.uid;
                $rootScope.authToken = response.data.authToken;

                sessionStorage.setItem("uid",response.data.uid);
                sessionStorage.setItem("authToken",response.data.authToken);
            
                $location.url("/profit_m");
            })
            .catch ((response) => {  // status 401 
                console.log("응답 코드: ", response.status);
               // console.log("에러 코드: ", response.data.result.id);
                console.log("응답 데이터: ", response.data.result.message);
                $window.alert("로그인 실패: " + response.data.result.message);
            });
        };
    });