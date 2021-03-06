(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);



function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}


function FoundItemsDirectiveController() {
  var list = this;

}




NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;
  list.searchTerm = "";
  //list.found = [];


  list.getMatchedMenuItems = function (searchTerm) {
    if(searchTerm.length>0){
      var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
      promise.then(function (response) {

      //  console.log(response);
        list.found =  response;
      }).catch(function (error) {
        console.log('Something went wrong');
      });

    } else {
      list.found = [];
    }
  }

  list.removeItem = function (itemIndex) {
    list.found.splice(itemIndex, 1);
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {

    var foundItems = [];

    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (response){ 
      var foundItems = response.data.menu_items.filter(function(el) {
          return el.description.indexOf(searchTerm) > -1;
      });
      return foundItems;
    })
    .catch(function (error) {
      console.log("Something went wrong in http");
    });

  };
}






})();
