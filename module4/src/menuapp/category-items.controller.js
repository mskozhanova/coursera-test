(function () {
'use strict';

angular.module('MenuApp')
.controller('itemsListController', itemsListController);


itemsListController.$inject = ['$stateParams', 'items'];
function itemsListController( $stateParams, items) {
  var itemsList = this;
  itemsList.short_name = $stateParams.short_name;
  itemsList.items = items;
}

})();
