var order = new Order();

function Order () {
  this.orderName = "",
  this.pizzas = [],
  count = 0
}

Order.prototype.addPizza = function(pizza) {
  count++;
  pizza.addID(count);
  this.pizzas.push(pizza);
}

Order.prototype.getPizza = function(pizzaID) {
  for (var i = 0; i < pizzas.length; i++) {
      if (pizzas[i].pizzaID === i) {
        return pizzas[i];
      }
    return false;
  };
};

function Pizza (username) {
  this.pizzaID = "",
  this.user = username,
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
  $("#sign-in-form").submit(function(event) {
    event.preventDefault();
    var name = $("#username").val()
    
    var pizza = new Pizza()
    console.log(pizza)
  })

  $("#pizza-mixer").submit(function(event) {
    event.preventDefault();
    var size = $("#size-selection").val();
    var sauce = $("#sauce-selection").val();
    var crust = $("#crust-selection").val();
    var toppings = "";

    pizza.chooseSize(size);
    pizza.chooseSauce(sauce);
    pizza.chooseCrust(crust);
    $("input:checkbox[name=topper]:checked").each(function(){
      pizza.toppings.push($(this).val());
    });
  })


});
