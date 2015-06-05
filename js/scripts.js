"use strict";


//jQuery
$( document ).ready(function () {
  var order;

  $("#welcome-button").on('click', function (event) {
    $(".contact-info").slideDown();
    $("#welcome").hide();
  });

  $("#contact-info").submit(function () {
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

  $("#cancel-contact").on('click', function (event) {
    $("form#contact-info").children().find('input').val('');
    setTimeout(function () { $("#welcome").show() }, 350);
    $(".contact-info").slideUp();
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

  $("#cancel-order").on('click', function () {
    order.cancelPizza();
    $(".order-form").children().find('select').prop('selectedIndex', 0);
    updatePrice(order);
    $(".pizza-order").hide();
    $("#price").hide();
    $("table#pizza-order").html("")
    $("table#pizza-order").append('<tr><th>Size:</th><th>Crust:</th><th>Sauce:</th><th>Toppings:</th><th>Cost:</th></tr>')
    $(".order-form").slideUp();
    $(".contact-info").slideDown();
  });

  $("#order-form").submit(function (event) {
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
  $(".pizza-order").slideDown();
};

function updatePrice(order) {
  var size     = $("#size").val();
  var crust    = $("#crust").val();
  var sauce    = $("#sauce").val();
  var toppings = $("#toppings").val();
  var pizza    = new Pizza(size, crust, sauce, toppings);
  if (!toppings) {
    toppings = [];
  }
  var total = order.price() + pizza.price();
  $("#price").html("Order Total: $" + total);
  $("#price").slideDown();
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
  this.name          = this.fullName();
  this.phone         = this.fullPhone();
  this.address       = this.fullAddress();
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

Order.prototype.cancelPizza = function (pizza) {
  if (arguments.length === 0) {
    this.pizzas = [];
    this.numPizzas = 0;
  }
};

Order.prototype.cancel = function () {
  var properties = Object.keys(this);
  this.cancelPizza();
  for (var i = 2; i < properties.length; i++) {
    this[properties[i]] = '';
  };
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
