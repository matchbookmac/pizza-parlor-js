"use strict";


//jQuery
$( document ).ready(function () {
    console.log( "jQuery Ready" );

    $("#jqtest").text('jQuery Ready')
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
function Order() {
  this.pizzas = [];
  this.numPizzas = 0;
};

Order.prototype.save = function (pizza) {
  this.pizzas.push(pizza);
  this.numPizzas++;
};
