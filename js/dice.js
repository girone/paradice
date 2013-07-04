angular.module('DiceApp', ['LocalStorageModule'])

function DiceController($scope, localStorageService) {
  // Default value for dice
  default_value = 'undefined';

  // Stores the current number of dice in the local webstorage.
  save_state = function() {
    localStorageService.add("DiceApp_num_dice", $scope.dice.length);
  }

  // Initialize the dice controller variables.
  $scope.max_num_dice = 20;
  $scope.dice = [{value:default_value}];
  var stored_num_dice = localStorageService.get('DiceApp_num_dice');
  if (!stored_num_dice) {
    stored_num_dice = 1;
  }
  for (var i = 1; i < stored_num_dice; i++) {
    $scope.dice.push({value:default_value});
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
      $scope.dice.push({value:default_value});
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
  
  maximum_length_of_squares_in_rect = function (N, a, b) {
    var l = Math.min(a, b);
    var n = 1;
    while (n < N) {
      l = 0.8 * l;
      n = Math.floor(a / l) * Math.floor(b / l);
    }
    return l;
  };

  // Determines the edge length of the dice.
  $scope.edge_length = function () {
    var dx = $("#dice-interactive-area").width();
    if (!$("#header") || !$("#footer"))
      return 20;
    var offsetHeader = $("#header").offset();
    var offsetFooter = $("#footer").offset();
    var dy = offsetFooter.top - offsetHeader.top;
    return 0.8 * maximum_length_of_squares_in_rect($scope.dice.length, dx, dy);
  };


}

