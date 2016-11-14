(function() {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListService', ShoppingListService);

    ToBuyController.$inject = ['ShoppingListService'];
    function ToBuyController(ShoppingListService) {
      var list = this;

      list.name = "";
      list.quantity = "";

      list.items = ShoppingListService.getItems();

      list.boughtItem = function(index) {
        ShoppingListService.removeItemAndAddToBoughtList(index);
      }
    }

    AlreadyBoughtController.$inject = ['ShoppingListService'];
    function AlreadyBoughtController(ShoppingListService) {
      var boughtList = this;

      boughtList.boughtItems = ShoppingListService.getBoughtItems();

      boughtList.getItems = function() {
        return boughtItems;
      }
    }

    function ShoppingListService() {
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
