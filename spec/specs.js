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
    var toppings = ['sausage', 'moar sausage', 'cheese'];
    var pizza    = new Pizza('huge', 'thick', 'red', toppings);
    expect(pizza.toppings).to.equal(toppings);
  });
});

describe('Order', function () {
  describe('save', function () {
    it('saves a pizza to an order', function () {
      var toppings = ['sausage', 'moar sausage', 'cheese'];
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
    var toppings  = ['sausage', 'moar sausage', 'cheese'];
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

  it('knows the areaCode of the person ordering', function () {
    var order = new Order('Ian', 'MacDonald', '123 Main St.', 'Portland', 'OR', '97214', '404');
    expect(order.areaCode).to.equal('404');
  });

  it('knows the centralOffice of the person ordering', function () {
    var order = new Order('Ian', 'MacDonald', '123 Main St.', 'Portland', 'OR', '97214', '404', '111');
    expect(order.centralOffice).to.equal('111');
  });

  it('knows the subscriberNum of the person ordering', function () {
    var order = new Order('Ian', 'MacDonald', '123 Main St.', 'Portland', 'OR', '97214', '404', '111', '3333');
    expect(order.subscriberNum).to.equal('3333');
  });

  describe('fullPhone', function () {
    it('knows the full address of the person ordering', function () {
      var order = new Order('Ian', 'MacDonald', '123 Main St.', 'Portland', 'OR', '97214', '404', '111', '3333');
      expect(order.fullPhone()).to.equal('(404) 111-3333');
    });
  });
});
