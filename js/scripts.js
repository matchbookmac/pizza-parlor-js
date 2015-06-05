"use strict";


//jQuery
$( document ).ready(function () {
  $("#welcome-button").on('click', function (event) {
    $("form#contact-info").show();
    $("#welcome").hide();
  });

  $("form#contact-info").submit(function () {

  });
});

//raw js
// Addition of Size function to Object
Object.prototype.size = function (object) {
  var properties = Object.keys(object);
  return properties.length;
};

// Toppings
function Toppings() {
  for (var i = 0; i < arguments.length; i++) {
    this[i] = arguments[i];
  };
};

Toppings.prototype.thing = function () {
  return 1;
};

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
