angular.module("app")
    .factory("orderService", function($http){ 
      
        const BASE_URL = "http://localhost:8089/order_m";
        
        return {
            list: function(pageNo=1) {
                const promise = $http.get(BASE_URL, {params:{pageNo:pageNo}});
                return promise;
            },
            read: function(order_id) {
                const promise = $http.get(BASE_URL + "/" + order_id);
                return promise;
            },
            update: function(jsonData) {
                // const promise = $http.put(BASE_URL, formData, {headers:{"Content-Type":undefined}});
                const promise = $http.put(BASE_URL, jsonData);
                return promise;
            },
            delete: function(order_id) {
                const promise = $http.delete(BASE_URL + "/" + order_id);
                return promise;
            },
            sattachUrl: function(sabang_id) {
                return BASE_URL + "/sattach/" + sabang_id;
            },
            pattachUrl: function(product_id) {
                return BASE_URL + "/pattach/" + product_id;
            }
        }
    });