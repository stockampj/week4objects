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
  this.crust = "",
  this.cost = ""
};

Pizza.prototype.addSize = function(size) {
  this.size = size;
};

Pizza.prototype.addToppings = function(topping) {
  this.toppings.push(topping);
};

Pizza.prototype.removeToppings = function(topping) {
  var toppingtoDelete = topping;
  for (i=0 ; i<this.toppings.length; i++) {
    if (toppingtoDelete === this.toppings[i]) {
      delete this.toppings[i];
      return "removed " + toppingToDelete;
    }
  };
};
