describe('Toppings', function () {
  it('has many toppings', function () {
    var toppings = new Toppings('sausage', 'moar sausage', 'cheese');
    expect(toppings[0]).to.equal("sausage");
    expect(toppings[1]).to.equal("moar sausage");
    expect(toppings[2]).to.equal("cheese");
  });

  it('has only as many toppings as arguments', function () {
    var toppings = new Toppings('sausage', 'moar sausage', 'cheese');
    expect(toppings[0]).to.equal("sausage");
    expect(toppings[1]).to.equal("moar sausage");
    expect(toppings[2]).to.equal("cheese");
    expect(typeof toppings[3]).to.equal("undefined");
  });
});

describe('Object', function () {
  describe('size', function () {
    it('returns the length of the array of property names for a given Object', function () {
      var toppings = new Toppings('sausage', 'moar sausage', 'cheese');
      expect(Object.size(toppings)).to.equal(3);
    })
  })
});

describe('Pizza', function () {
  it("has a size", function () {
    var pizza = new Pizza('huge');
    expect(pizza.crustSize).to.equal('huge');
  });

  it("has a crust type", function () {
    var pizza = new Pizza('huge', 'thick');
    expect(pizza.crust).to.equal('thick');
  });

  it("has a sauce type", function () {
    var pizza = new Pizza('huge', 'thick', 'red');
    expect(pizza.sauce).to.equal('red');
  });

  it("has toppings", function () {
    var toppings = new Toppings('stuff', 'things');
    var pizza    = new Pizza('huge', 'thick', 'red', toppings);
    expect(pizza.toppings).to.equal(toppings);
  });
});

describe('Order', function () {
  describe('save', function () {
    it('saves a pizza to an order', function () {
      var toppings = new Toppings('stuff', 'things');
      var pizza    = new Pizza('huge', 'thick', 'red', toppings);
      var pizza2   = new Pizza('small', 'thin', 'alfredo', toppings);
      var order    = new Order();
      order.save(pizza);
      order.save(pizza2);
      expect(order.pizzas).to.eql([pizza, pizza2]);
    });
  });

  it('knows the number of pizzas in an order', function () {
    var order     = new Order();
    var toppings  = new Toppings('stuff', 'things');
    var pizza     = new Pizza('huge', 'thick', 'red', toppings);
    var pizza2    = new Pizza('small', 'thin', 'alfredo', toppings);
    order.save(pizza);
    order.save(pizza2);
    expect(order.numPizzas).to.equal(2);
  });

  it('knows the first name of the person ordering', function () {
    var order = new Order('Ian');
    expect(order.firstName).to.equal('Ian');
  });

  it('knows the last name of the person ordering', function () {
    var order = new Order('Ian', 'MacDonald');
    expect(order.lastName).to.equal('MacDonald');
  });

  describe('fullName', function () {
    it('knows the full name of the person ordering', function () {
      var order = new Order('Ian', 'MacDonald');
      expect(order.fullName()).to.equal('Ian MacDonald');
    });
  });

  it('knows the street address of the person ordering', function () {
    var order = new Order('Ian', 'MacDonald', '123 Main St.');
    expect(order.street).to.equal('123 Main St.');
  });

  it('knows the City of the person ordering', function () {
    var order = new Order('Ian', 'MacDonald', '123 Main St.', 'Portland');
    expect(order.city).to.equal('Portland');
  });

  it('knows the State of the person ordering', function () {
    var order = new Order('Ian', 'MacDonald', '123 Main St.', 'Portland', 'OR');
    expect(order.state).to.equal('OR');
  });

  it('knows the Zip of the person ordering', function () {
    var order = new Order('Ian', 'MacDonald', '123 Main St.', 'Portland', 'OR', '97214');
    expect(order.zip).to.equal('97214');
  });

  describe('fullAddress', function () {
    it('knows the full address of the person ordering', function () {
      var order = new Order('Ian', 'MacDonald', '123 Main St.', 'Portland', 'OR', '97214');
      expect(order.fullAddress()).to.equal('Ian MacDonald\n123 Main St.\nPortland, OR 97214');
    });
  });
});
