"use strict";


//jQuery
$( document ).ready(function() {
    console.log( "jQuery Ready" );

    $("#jqtest").text('jQuery Ready')
});

//raw js
function Toppings() {

};

function Pizza(crust, sauce, toppings) {
  this.crust    = crust;
  this.sauce    = sauce;
  this.toppings = toppings;
};
