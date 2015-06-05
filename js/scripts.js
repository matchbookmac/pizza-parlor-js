"use strict";


//jQuery
$( document ).ready(function () {
  var order;

  $("#welcome-button").on('click', function (event) {
    $("form#contact-info").show();
    $("#welcome").hide();
  });

  $("form#contact-info").submit(function () {
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

    $("#contact-info").hide();
    $("#order-form").show();
  });

  $("form#order-form").submit(function (event) {
    event.preventDefault();
    var size     = $("#size").val();
    var crust    = $("#crust").val();
    var sauce    = $("#sauce").val();
    var toppings = new Toppings($("#toppings").val());
    var pizza    = new Pizza(size, crust, sauce, toppings);
    order.save(pizza);
  });
});

//raw js
// Pizza
function Pizza(size, crust, sauce, toppings) {
  this.crustSize = size;
  this.crust     = crust;
  this.sauce     = sauce;
  this.toppings  = toppings;
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

Order.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
};

Order.prototype.fullAddress = function () {
  return this.firstName + ' ' + this.lastName + '\n' + this.street + '\n' + this.city + ', ' + this.state + ' ' + this.zip;
};

Order.prototype.fullPhone = function () {
  return '(' + this.areaCode + ')' + ' ' + this.centralOffice + '-' + this.subscriberNum;
};
