var order = new Order();

function Order () {
  this.orderName = "",
  this.pizzas = [],
  this.count = 0
}

Order.prototype.addPizza = function(pizza) {
  this.count++;
  pizza.addID(this.count);
  this.pizzas.push(pizza);
}

Order.prototype.getPizza = function(pizzaID) {
  for (var i = 0; i < this.pizzas.length; i++) {
    if (this.pizzas[i].pizzaID === i+1) {
      return this.pizzas[i];
    } else {
      return false;
    };
  };
};

function Pizza () {
  this.pizzaID = "",
  this.size = "",
  this.sauce= "",
  this.crust = "standard",
  this.toppings = [],
  this.cost = 12
};

Pizza.prototype.addID = function (count) {
  this.pizzaID = count;
};

Pizza.prototype.chooseSize = function(size) {
  this.size = size;
};

Pizza.prototype.chooseSauce = function(sauce) {
  this.sauce = sauce;
}

Pizza.prototype.addToppings = function(topping) {
  this.toppings.push(topping);
};

Pizza.prototype.removeTopping = function(topping) {
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
  var numberOfToppings = this.toppings.length
  if (numberOfToppings <= 2) {
    var toppingsCost = 0;
  } else {
    var toppingsCost = (numberOfToppings - 2)*1.5
  }
  var crustCost;
  if (this.crust !== "standard") {
    crustCost = 1.20;
  }
  var sizeCost;
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

function signIn (name) {
  order.orderName = name
}

function createPizza (size, sauce, crust, toppings) {
  var pizza = new Pizza();
  pizza.chooseSize(size);
  pizza.chooseSauce(sauce);
  pizza.chooseCrust(crust);
  pizza.toppings = toppings;
  pizza.calculateCost();
  order.addPizza(pizza)
}


$(document).ready(function(){
  $("#sign-in-form").submit(function(event) {
    event.preventDefault();
    var name = $("#username").val()
    signIn(name)
    console.log(order)
  })

  $("#pizza-mixer").submit(function(event) {
    event.preventDefault();

    var size = $("#size-selection").val();
    var sauce = $("#sauce-selection").val();
    var crust = $("#crust-selection").val();
    var toppings = [];
    $("input:checkbox[name=toppers]:checked").each(function(){
      toppings.push($(this).val());
    });
    createPizza (size, sauce, crust, toppings);
  })
});
