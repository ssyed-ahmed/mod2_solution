(function() {
  'use strict';

  angular.module('ShoppingListApp', [])
    .controller('ShoppingListController', ShoppingListController)
    .controller('ShoppingListBoughtController', ShoppingListBoughtController)
    .provider('ShoppingListService', ShoppingListServiceProvider)
    .config(Config);

    Config.$inject = ['ShoppingListServiceProvider'];
    function Config(ShoppingListServiceProvider) {
      ShoppingListServiceProvider.defaults.maxItems = 5;
    }

    ShoppingListController.$inject = ['ShoppingListService'];
    function ShoppingListController(ShoppingListService) {
      var list = this;

      list.name = "";
      list.quantity = "";

      list.items = ShoppingListService.getItems();

      list.boughtItem = function(index) {
        ShoppingListService.removeItemAndAddToBoughtList(index);
      }
    }

    ShoppingListBoughtController.$inject = ['ShoppingListService'];
    function ShoppingListBoughtController(ShoppingListService) {
      var boughtList = this;

      boughtList.boughtItems = ShoppingListService.getBoughtItems();

      boughtList.getItems = function() {
        return boughtItems;
      }
    }

    function ShoppingListService(maxItems) {
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

      service.addItem = function(itemName, itemQuantity) {
        if ((maxItems === undefined) || (maxItems !== undefined && items.length < maxItems)) {
          var item = {
            name: itemName,
            quantity: itemQuantity
          };
          items.push(item);
        } else {
          throw new Error('Cannot add any more items. Max. ' + maxItems + ' items allowed.');
        }
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

    function ShoppingListServiceProvider() {
      var provider = this;

      provider.defaults = {
        maxItems: 10
      };

      provider.$get = function() {
        var shoppingList = new ShoppingListService(provider.defaults.maxItems);
        return shoppingList;
      }
    }
})();
