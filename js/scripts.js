"use strict";


//jQuery
$( document ).ready(function () {
  var order;

  $("#welcome-button").on('click', function (event) {
    $(".contact-info").slideDown();
    $("#welcome").hide();
  });

  $(".contact-info").submit(function () {
    event.preventDefault();
    var firstName     = $("#first-name").val();
    var lastName      = $("#last-name").val();
    var street        = $("#street").val();
    var city          = $("#city").val();
    var state         = $("#state").val();
    var zip           = $("#zip").val();
    var areaCode      = $("#area-code").val();
    var centralOffice = $("#central-office").val();
    var subscriberNum = $("#subscriber-num").val();
    order             = new Order(firstName, lastName, street, city, state, zip, areaCode, centralOffice, subscriberNum);

    $(".contact-info").slideUp();
    $("#order-header").html("Create Your Pizza " + order.fullName() + "!")
    $(".order-form").slideDown();
  });

  $('select').change(function() {
    updatePrice(order);
  });

  $("#order-submit").on('click', function (event) {
    $(".order-form").hide();
    submitOrderForm(order);
    $(".final-checkout").show();
  });

  $("#add-pizza").on('click', function (event) {
    submitOrderForm(order);
    setTimeout(function () { $(".order-form").children().find('select').prop('selectedIndex', 0); }, 500);
  });

  $(".order-form").submit(function (event) {
    event.preventDefault();
  });
});

function submitOrderForm(order) {
  var size     = $("#size").val();
  var crust    = $("#crust").val();
  var sauce    = $("#sauce").val();
  var toppings = $("#toppings").val();
  var pizza    = new Pizza(size, crust, sauce, toppings);
  order.save(pizza);
  $("table#pizza-order").append(
    '<tr>' +
      '<td>' + pizza.crustSize + '</td>' +
      '<td>' + pizza.crust + '</td>' +
      '<td>' + pizza.sauce + '</td>' +
      '<td>' +
        toppingsTable(pizza) +
      '</td>' +
      '<td>$' + pizza.price() + '</td>' +
    '</tr>'
  );
};

function updatePrice(order) {
  var size     = $("#size").val();
  var crust    = $("#crust").val();
  var sauce    = $("#sauce").val();
  var toppings = $("#toppings").val();
  var pizza    = new Pizza(size, crust, sauce, toppings);
  if (toppings) {    
    var total = order.price() + pizza.price();
    $("#price").html("Order Total: $" + total);
  }
};

function toppingsTable(pizza) {
  var table = '<table>'
    for (var i = 0; i < pizza.toppings.length; i++) {
      table += '<tr><td>' + pizza.toppings[i] + '</td></tr>'
    }
  table += '</table>'
  return table;
}

//raw js
// Pizza
Pizza.prototype.sizes = { 'Small' : 1, 'Medium': 2, 'Large': 3, 'Extra-Large': 4, "Let's Get Serious": 5 };

function Pizza(size, crust, sauce, toppings) {
  this.size      = Pizza.prototype.sizes[size];
  this.crustSize = size;
  this.crust     = crust;
  this.sauce     = sauce;
  this.toppings  = toppings;
};

Pizza.prototype.price = function () {
  return 10 + this.size + this.toppings.length;
};

// Order
function Order(first, last, street, city, state, zip, areaCode, centralOffice, subscriberNum) {
  this.pizzas        = [];
  this.numPizzas     = 0;
  this.firstName     = first;
  this.lastName      = last;
  this.street        = street;
  this.city          = city;
  this.state         = state;
  this.zip           = zip;
  this.areaCode      = areaCode;
  this.centralOffice = centralOffice;
  this.subscriberNum = subscriberNum;
};

Order.prototype.save = function (pizza) {
  this.pizzas.push(pizza);
  this.numPizzas++;
};

Order.prototype.price = function () {
  var total = 0;
  if (this.pizzas.length > 0) {
    for (var i = 0; i < this.pizzas.length; i++) {
      total += this.pizzas[i].price();
    };
  }
  return total;
};

Order.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
};

Order.prototype.fullAddress = function () {
  return this.firstName + ' ' + this.lastName + '\n' + this.street + '\n' + this.city + ', ' + this.state + ' ' + this.zip;
};

Order.prototype.fullPhone = function () {
  return '(' + this.areaCode + ')' + ' ' + this.centralOffice + '-' + this.subscriberNum;
};
