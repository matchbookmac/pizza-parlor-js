describe('pizza', function() {
  it("has a crust type", function() {
    var pizza = new Pizza('thick');
    expect(pizza.crust).to.equal('thick');
  });

  it("has a sauce type", function() {
    var pizza = new Pizza('thick', 'red');
    expect(pizza.sauce).to.equal('red');
  });

  it("has toppings type", function() {
    var toppings = new Toppings();
    var pizza = new Pizza('thick', 'red', toppings);
    expect(pizza.toppings).to.equal(toppings);
  });

});
