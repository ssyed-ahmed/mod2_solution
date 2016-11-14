(function() {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
      var list = this;

      list.name = "";
      list.quantity = "";

      list.items = ShoppingListCheckOffService.getItems();

      list.boughtItem = function(index) {
        ShoppingListCheckOffService.removeItemAndAddToBoughtList(index);
      }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
      var boughtList = this;

      boughtList.boughtItems = ShoppingListCheckOffService.getBoughtItems();

      boughtList.getItems = function() {
        return boughtItems;
      }
    }

    function ShoppingListCheckOffService() {
      var service = this;

      var items = [
        {
          name: "cookies",
          quantity: 10
        },
        {
          name: "donuts",
          quantity: 5
        },
        {
          name: "chips",
          quantity: 15
        },
        {
          name: "soft drinks",
          quantity: 20
        },
        {
          name: "chocolates",
          quantity: 30
        }
      ];

      var boughtItems = [];

      service.getItems = function() {
        return items;
      };

      service.removeItem = function(index) {
        var removedItem = items.splice(index, 1);
        return removedItem;
      };

      service.removeItemAndAddToBoughtList = function(index) {
        var removedItem = items.splice(index, 1);
        boughtItems.push(removedItem[0]);
      }

      service.getBoughtItems = function() {
        return boughtItems;
      }
    }
})();
