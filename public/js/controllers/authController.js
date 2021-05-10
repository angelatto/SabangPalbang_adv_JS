angular.module("app")
    .controller("authController", function($scope, authService, $window, $rootScope, $location) {
        
        $scope.login = (user) => {
            authService.login(user)
            .then((response) => {
                $rootScope.uid = response.data.uid;
                $rootScope.authToken = response.data.authToken;

                sessionStorage.setItem("uid",response.data.uid);
                sessionStorage.setItem("authToken",response.data.authToken);
            
                $location.url("/profit_m");
            })
            .catch ((response) => {
                $window.alert("로그인 실패:" + response.data.message);
            });
        };
    });