var order = new Order();
var activeID = ""

function Order () {
  this.orderName = "",
  this.pizzas = [],
  this.orderCost,
  this.count = 0
}

Order.prototype.addPizza = function(pizza) {
  this.count++;
  pizza.addID(this.count);
  this.pizzas.push(pizza);
}

Order.prototype.calcOrderCost = function() {
  var total = 0;
  for (var i=0; i<this.pizzas.length; i++) {
    if (this.pizzas[i]) {
      var pizzaCost = this.pizzas[i].cost;
      total += pizzaCost;
    }
  }
  this.orderCost = total.toFixed(2);
}

Order.prototype.getPizza = function(pizzaID) {
  for (var i = 0; i < this.pizzas.length; i++) {
    if (this.pizzas[i].pizzaID == pizzaID) {
      return this.pizzas[i];
    }
  };
  return false;
};

Order.prototype.removePizza = function (pizzaID) {
  for (var i = 0; i < this.pizzas.length; i++) {
    if (this.pizzas[i].pizzaID == pizzaID) {
      delete this.pizzas[i];
    }
  };
  return false;
}

function Pizza (size, sauce, crust, toppings) {
  this.size = size,
  this.sauce= sauce,
  this.crust = crust,
  this.toppings = toppings,
  this.cost = 12
};

Pizza.prototype.addID = function (count) {
  this.pizzaID = count;
};

// Pizza.prototype.removeTopping = function(topping) {
//   var toppingToDelete = topping;
//   var currentToppings = [];
//   for (i=0 ; i<this.toppings.length; i++) {
//     if (toppingToDelete !== this.toppings[i]) {
//       currentToppings.push(this.toppings[i]);
//     }
//   };
//   this.toppings = currentToppings
// };

Pizza.prototype.calculateCost = function() {
  var numberOfToppings = this.toppings.length
  var toppingsCost = "";
  if (numberOfToppings <= 2) {
    toppingsCost = 0;
  } else {
    toppingsCost = (numberOfToppings - 2)*1.5
  }
  var crustCost= 0;
  if (this.crust !== "standard") {
    crustCost = 1.20;
  }
  var sizeCost;
  if (this.size === "Party") {
    var sizeCost = 18;
  } else if (this.size === "Medium") {
    var sizeCost = 12;
  } else if (this.size === "Personal") {
    var sizeCost = 7;
  } else {
    return false;
  }
  this.cost = toppingsCost + crustCost + sizeCost;
  return this.cost.toFixed(2);
}

function signIn (name) {
  order.orderName = name;
}

function attachListeners() {
  $(".orderlist").on("click", "li", function() {
    activeID = this.id;
    var string = "#" + activeID;
    $(".pizza-description").removeClass("active")
    $(string).addClass("active")
  });
}

$(document).ready(function(){
  attachListeners();

  $("#sign-in-form").submit(function(event) {
    event.preventDefault();
    var name = $("#username").val();
    signIn(name);
    $(".ui").hide()
    $("#size-sauce-crust").show();
  })

  $("#to-toppings").click(function(){
    $(".ui").hide()
    $("#toppings").show();
    $("#place-order").show();
  });

  $("#to-size-sauce-crust").click(function(){
  $(".ui").hide()
  $("#size-sauce-crust").show();
  $("#place-order").show();
  });


$("input[name='bird']:checked").val()

  $("#pizza-mixer").submit(function(event) {
    event.preventDefault();
    var size = $("input[name='size']:checked").val();
    var sauce = $("input[name='sauce']:checked").val();
    var crust = $("input[name='crust']:checked").val();
    var toppings = [];
    $("input:checkbox[name=toppers]:checked").each(function(){
      toppings.push($(this).val());
    });
    var pizza = new Pizza(size, sauce, crust, toppings);
    pizza.calculateCost();
    order.addPizza(pizza);
    $(".ui").hide()
    $("#order-summary").show();
    showOrder();
  })

  function showOrder() {
    $("#message").text("")
    $(".orderlist").text("");
    for (var i=0; i< order.pizzas.length; i++) {
      if (order.pizzas[i]){
        var pizza = order.pizzas[i];
        var id = pizza.pizzaID;
        var size = pizza.size;
        var crust = pizza.crust;
        var sauce = pizza.sauce;
        var toppings = pizza.toppings;
        var cost = pizza.cost;
        var toppingsString = "";
        toppings.forEach(function(topping){
          toppingsString +=  topping + ", ";
        })
        var pizzaString = "<li class='pizza-description' id='" + id + "'><p>" + size + " pizza with " + crust + " crust and " + sauce + " sauce<br><span class='topping-list'>" + toppingsString + "</span><br><span class='pizzacost'>$" + cost.toFixed(2) +"</span></p></li>";

        $(".orderlist").append(pizzaString);
      };
    };
    order.calcOrderCost()
    activeID = ""
  }

  $("#add-another").click(function(){
    clearForm();
    $(".ui").hide()
    $("#size-sauce-crust").show();
  })

  $("#remove-pizza").click(function() {
    if (activeID === "") {
      var string = "Please select a pizza to delete";
      $("#message").append(string)
    } else {
      order.removePizza(activeID);
      showOrder();
    }
  })

  function clearForm() {
    $("#size-selection").val("sm");
    $("#sauce-selection").val("marinara");
    $("#crust-selection").val("standard");
    $(".checkbox").prop("checked", false);
  }

  $("#complete-order").click(function(){
    $(".ui").hide();
    $("#order-complete").show();
    showOrder();
    $(".totalcost").text(order.orderCost);
  })


});
