(function () {
'use strict';

angular.module('MsgApp', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.message = "";
  $scope.items="";
  $scope.color="grey";

  $scope.countThem = function () {
    var lunchItems = $scope.items.split(',');
    $scope.num = lunchItems.length;
    if($scope.items=="" )
      $scope.num=0;

    if($scope.num==0  ) {
        $scope.message = "Please enter data first";
        $scope.color="grey";
      } else {
        if($scope.num>0){
          $scope.message = "Enjoy!";
          $scope.color="green";
        }
        if($scope.num>3){
          $scope.message = "Too much!";
          $scope.color="red";
        }
      }
  };



}

})();
