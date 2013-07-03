angular.module('DiceApp', ['LocalStorageModule'])

function DiceController($scope, localStorageService) {
  // Stores the current number of dice in the local webstorage.
  save_state = function() {
    localStorageService.add("DiceApp_num_dice", $scope.dice.length);
  }

  // Initialize the dice controller variables.
  $scope.max_num_dice = 6;
  $scope.dice = [{value:'undefined'}];
  var stored_num_dice = localStorageService.get('DiceApp_num_dice');
  if (!stored_num_dice) {
    stored_num_dice = 1;
  }
  for (var i = 1; i < stored_num_dice; i++) {
    $scope.dice.push({value:'-'});
  }

  // Returns the number of dice.
  $scope.num_dice = function () {
    return $scope.dice.length;
  };

  // Returns the string "die" or "dice" depending on the number of dice.
  $scope.die_or_dice = function () {
    return $scope.num_dice() == 1 ? "die" : "dice";
  }

  // Adds a die.
  $scope.add_die = function () {
    if ($scope.num_dice() < $scope.max_num_dice) {
      $scope.dice.push({value:'undefined'});
      save_state();
    }
  }

  // Removes a die, if there is at least one.
  $scope.remove_die = function () {
    if ($scope.num_dice() > 1) {
      $scope.dice.pop();
      save_state();
    }
  }

  // Rolls the dice, assigning new values to each. Will later also play 
  // initiate animation.
  $scope.roll = function () {
    var num = $scope.dice.length;
    $scope.dice = [];
    for (var i = 0; i < num; i++) {
      // random number using underscore library
      $scope.dice.push({value:_.random(1,6)});
    }
  };
}

