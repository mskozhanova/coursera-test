(function () {
"use strict";

angular.module('public')
.controller('RegistrationController', RegistrationController);
RegistrationController.$inject = ['MenuService'];

function RegistrationController(MenuService) {
  var reg = this;

  reg.submit = function () {
    console.log("reg user favdish - "+reg.user.favdish);
    var promise = MenuService.getMenuItem(reg.user.favdish);

    promise.then(function(response) {
      var data = response.data;
      var regUser = {
        firstname: reg.user.firstname,
        lastname: reg.user.lastname,
        email: reg.user.email,
        phone: reg.user.phone,
        dish_name: data.name,
        dish_short_name: data.short_name,
        dish_description: data.description
      };
      console.log("regUser - "+regUser);
      reg.nosuchdish = false;
      reg.completed = MenuService.setUserData(regUser);


    })
    .catch(function(error) {
      console.log(error);
      reg.nosuchdish = true;
      reg.completed = false;
    });

  };

  reg.saveData = function(){
    console.log("inside ctrl data");
    MenuService.saveUserData();
  }


}


})();
