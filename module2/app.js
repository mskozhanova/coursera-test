(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;

  toBuyList.items = ShoppingListCheckOffService.getBuyItems();

  toBuyList.removeItem = function (itemIndex) {
    try {
      ShoppingListCheckOffService.removeItem(itemIndex);
    } catch (error) {
      toBuyList.emptyMessage = error.message;
    }
  };
}
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  boughtList.items = ShoppingListCheckOffService.getBoughtItems();

}

function ShoppingListCheckOffService() {
  var service = this;

  var buyItems = [{name: 'cookies', quantity: 5},
{name: 'bread', quantity: 1},
{name: 'milk', quantity: 2},
{name: 'sugar', quantity: 500},
{name: 'banana', quantity: 25}];
var boughtItems = [];

  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    buyItems.push(item);
  };

  service.removeItem = function (itemIdex) {
    var boughtItem = buyItems.splice(itemIdex, 1);
    boughtItem.forEach(function(item, i, arr) {
      boughtItems.push(item);
  });


  };

  service.getBuyItems = function () {
    return buyItems;
  };
  service.getBoughtItems = function () {
    return boughtItems;
  };
}






})();
