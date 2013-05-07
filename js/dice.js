angular.module('DiceApp', ['LocalStorageModule'])

function DiceController($scope, localStorageService) {
  // Stores the current number of dice in the local webstorage.
  save_state = function() {
    localStorageService.add("DiceApp_num_dice", $scope.dice.length);
  }

  // Initialize the dice.
  $scope.dice = [{value:'-'}];
  
  // Adjusts the dice according to cookie's (here: local webstorage) value.
  var stored_num_dice = localStorageService.get('DiceApp_num_dice');
  if (!stored_num_dice) {
    stored_num_dice = 1;
  }
  localStorageService.add('NiceUpTheDice_test_key', 42);
  var test2 = localStorageService.get('NiceUpTheDice_test_key', 42);
  for (var i = 1; i < stored_num_dice; i++) {
    $scope.dice.push({value:'-'});
  }

  // Returns the number of dice.
  $scope.num_dice = function () {
    return $scope.dice.length;
  };

  // Adds a die.
  $scope.add_die = function () {
    $scope.dice.push({value:'-'});
    save_state();
  }

  // Removes a die, if there is at least one.
  $scope.remove_die = function () {
    if ($scope.num_dice() > 1) {
      $scope.dice.pop();
      save_state();
    }
  }

  // Rolls the dice, assigning new values to each.
  $scope.roll = function () {
    var num = $scope.dice.length;
    $scope.dice = [];
    for (var i = 0; i < num; i++) {
      // random number using underscore library
      $scope.dice.push({value:_.random(1,6)});
    }
  };
}

