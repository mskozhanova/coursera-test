(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$q', '$timeout', '$http', 'ApiBasePath']
function MenuDataService($q, $timeout, $http, ApiBasePath) {
  var service = this;

  var categories = [];
  var items = [];

  service.getAllCategories = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    }).then(function successCallback(response) {
        console.log("success");
        categories =  response.data;
    }, function errorCallback(response) {
              console.log("error");
    });

    var deferred = $q.defer();
     $timeout(function () {
       deferred.resolve(categories);
     }, 500);
     return deferred.promise;
  };

  service.getItemsForCategory = function (categoryShortName) {
    //console.log("categoryShortName - "+categoryShortName);

    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName)
    }).then(function successCallback(response) {
        console.log("success1");
        //console.log(response.data);
        items =  response.data.menu_items;
    }, function errorCallback(response) {
              console.log("error1");
    });

    var deferred = $q.defer();
     $timeout(function () {
       deferred.resolve(items);
     }, 500);
     return deferred.promise;
  };



}

})();
