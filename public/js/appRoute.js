angular.module("app") 
.config(function($locationProvider, $routeProvider) {
    //HTML5 모드 활성화
        console.log("app - config callback");
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });

    $routeProvider
    // 왼쪽은 라우트 경로, templateUrl은 물리적인 경로
    .when("/", {templateUrl: "views/login.html",controller:"authController"})
    .when("/member_m", {templateUrl:"views/member_m/member_m_index.html", controller:"memberController"})
    .when("/sabang_m", {templateUrl:"views/sabang_m/sabang_m_index.html", controller:"sabangController"})
    .when("/palbang_m", {templateUrl:"views/palbang_m/palbang_m_index.html", controller:"palbangController"})
    .when("/order_m", {templateUrl:"views/order_m/order_m_index.html", controller:"orderController"})
    .when("/inquiry_m", {templateUrl:"views/inquiry_m/inquiry_m_index.html", controller:"inquiryController"})
    .when("/profit_m", {templateUrl:"views/profit_m/profit_m_index.html", controller:"profitController"})
    .otherwise({redirectTo: "/"});
});  