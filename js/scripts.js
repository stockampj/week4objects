// <button onclick="setTimeout(myFunction, 3000)">Try it</button>
//
// <script>
// function myFunction() {
//   alert('Hello');
// }
// </script>


function Pizza (username) {
  this.user = username,
  this.size = ""
  this.toppings = [],
  this.crust = "standard",
  this.cost = ""
};

Pizza.prototype.chooseSize = function(size) {
  this.size = size;
};

Pizza.prototype.addToppings = function(topping) {
  this.toppings.push(topping);
};

Pizza.prototype.removeToppings = function(topping) {
  var toppingToDelete = topping;
  var currentToppings = [];
  for (i=0 ; i<this.toppings.length; i++) {
    if (toppingToDelete !== this.toppings[i]) {
      currentToppings.push(this.toppings[i]);
    }
  };
  this.toppings = currentToppings
};

Pizza.prototype.chooseCrust = function(crust) {
  this.crust = crust;
};

Pizza.prototype.calculateCost = function() {
  var toppingsCost = (this.toppings.length)*1.5;
  var crustCost = 0;
  var sizeCost = 15;
  if (this.crust !== "standard") {
    crustCost = 1.20;
  }
  if (this.size === "lg") {
    var sizeCost = 18;
  } else if (this.size === "md") {
    var sizeCost = 15;
  } else if (this.size === "sm") {
    var sizeCost = 12;
  } else {
    return false;
  }
  this.cost = toppingsCost + crustCost + sizeCost;
  return this.cost;
}

$(document).ready(function(){


});
