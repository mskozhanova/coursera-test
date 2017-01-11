(function () {
"use strict";

angular.module('public')
.controller('InfoController', InfoController);

InfoController.$inject = ['MenuService'];
function InfoController(MenuService) {

  var info = this;

  info.UserInfo = MenuService.getUserData();

  var cntr = 0;
  for (var key in info.UserInfo)
    cntr++;

  console.log("length: " + cntr);
  if(cntr>0)
    info.SignUp = false;
  else
    info.SignUp = true;

}


})();
