const ShoppingCart = require("../models/shoppingCart");
const User = require("../models/user");
const Product = require("../models/product");
exports.addProuctToCart = (userName, productId) => {
  console.log("inside addProuctToCart of UserService");

  let user = User.findByUserName(userName);
  let product = Product.findById(productId);
  const found = user.shoppingCartList.find(s => s.productId === parseInt(productId) );

  if(found){
    this.increaseProductQuantity(userName,found.id)

  }else{
    let totalPrice = user.total;
    if (product.stock > 0) {
      const shoppingCart = new ShoppingCart(
        product.id,
        product.name,
        product.price
      );
      user.shoppingCartList.push(shoppingCart);
      totalPrice += shoppingCart.total;
    }
    else {
      throw new Error('Product Out of Stock');
    }
    // update the total price
    user.total = totalPrice;

  }
  

 
};

exports.increaseProductQuantity = (userName, shoppingCartId) => {
  console.log("inside increaseProductQuantity of UserService");

  let user = User.findByUserName(userName);
  var totalPrice = user.total;

  user.shoppingCartList
    .filter((s) => s.id === shoppingCartId)
    .map((s) => {
      let product = Product.findById(s.productId);
      if (product.stock > s.quantity ) {
        s.quantity = s.quantity + 1;
        s.total = s.quantity * s.price;
        totalPrice += parseFloat(s.price);
        return s;
      } else {
        throw new Error('Product Out of Stock');
      }
    });

  // update the total price
  user.total = totalPrice;
};

exports.decreaseProductQuantity = (userName, shoppingCartId) => {
  console.log("inside decreaseProductQuantity of UserService");

  let user = User.findByUserName(userName);
  var totalPrice = user.total;

  user.shoppingCartList = user.shoppingCartList
    .filter((s) => s.id === shoppingCartId)
    .map((s) => {
      let product = Product.findById(s.productId);
      if (product) {
        s.quantity = s.quantity - 1;
        s.total -= parseFloat(s.price);
        totalPrice -= parseFloat(s.price);
        return s;
      } 
      
    }).filter((s) => s.quantity > 0);
    user.total = totalPrice;
    
    
  // update the total price
  
};

exports.getUserFromRequestHeader = (userName) => {
  return userName.match(/^[^\d]*/)[0];
};

exports.getShoppingCartListByUserName = (userName) => {
  const user = User.findByUserName(userName);
  return {
    total: user.total,
    shoppingCartList: user.shoppingCartList,
  };
};

exports.placeOrder = (userName) => {
  console.log("inside placeOrder of UserService");

  let user = User.findByUserName(userName);
  user.shoppingCartList.forEach((s) => {
    let product = Product.findById(s.productId);
    const stockRemaining = product.stock - parseFloat(s.quantity);
    new Product(
      product.id,
      product.name,
      product.price,
      product.image,
      stockRemaining
    ).update();
  });

  user.shoppingCartList = [];
};

