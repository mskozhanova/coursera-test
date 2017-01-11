(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  var userData = {};

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getMenuItem = function (short_name) {
    return $http.get(ApiPath + '/menu_items/'+short_name+'.json').then(function (response) {
      //console.log(response);
      return response;
    });
  };

  service.setUserData = function(regUser){
  //  userData = {};
    regUser.dish_img_src = ApiPath + "/images/" + regUser.dish_short_name + ".jpg"
    userData = regUser;
    console.log("userData: "+userData.dish_img_src);
    return true;
  };
  service.getUserData = function(){
    return userData;
  };


}



})();
