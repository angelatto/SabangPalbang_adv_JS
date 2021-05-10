angular.module("app")
    .factory("profitService", function($http){

        const BASE_URL = "http://localhost:8089/profit_m";
        //채정 - 멤버
        const ADD_URL_MEMBER = "/member";
        //종현 - 사방
        const ADD_URL_SABANG = "/sabang";
        //민상 - 주문
        const ADD_URL_ORDER = "/order";
        return {
            //채정 - 멤버
            showBestMember: function() {
                const promise = $http.get(BASE_URL+ADD_URL_MEMBER);
                return promise;
            },
            //종현 - 사방
            showBestSabang: function() {
                const promise = $http.get(BASE_URL+ADD_URL_SABANG);
                return promise;
            },
            sattachUrl: function(sabang_id) {
                return BASE_URL + ADD_URL_SABANG + "/sattach/" + sabang_id;
            },
            pattachUrl: function(product_id) {
                return BASE_URL + ADD_URL_SABANG + "/pattach/" + product_id;
            },
            palattachUrl: function(palbang_id) {
                return BASE_URL + ADD_URL_SABANG + "/palattach/" + palbang_id;
            },

            //민상 - 주문
            monthbuy: function() {
                const promise = $http.get(BASE_URL + ADD_URL_ORDER);
                return promise;
            }

            
        }
    });