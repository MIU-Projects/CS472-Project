const ShoppingCart = require('../models/shoppingCart');
const User = require('../models/user')
const UserService = require('../service/userService')

exports.getUserByUserName = (req,res,next) =>{
    res.status(200).json(User.findByUserNameAndPassword(req.query.userName,req.query.password));
}


exports.saveToShoppingCart = (req,res,next) =>{
    
const userName = UserService.getUserFromRequestHeader(req.header('User-Data'));
UserService.addProuctToCart(userName , req.params.productId);
res.status(200).json({});
    
}

exports.addQuantity = (req,res,next) =>{
    const userName = UserService.getUserFromRequestHeader(req.header('User-Data'));
    UserService.increaseProductQuantity(userName , req.params.shoppingId);
    res.status(200).json({});
        
}

exports.decreaseQuantity = (req,res,next) =>{
    const userName = UserService.getUserFromRequestHeader(req.header('User-Data'));
    UserService.decreaseProductQuantity(userName , req.params.shoppingId);
    res.status(200).json({});
        
}

exports.getShoppingCartListByUserName = (req,res,next) =>{
    const userName = UserService.getUserFromRequestHeader(req.header('User-Data'));
    res.status(200).json(UserService.getShoppingCartListByUserName(userName));
}

exports.placeOrder = (req,res,next) =>{
    const userName = UserService.getUserFromRequestHeader(req.header('User-Data'));
    UserService.placeOrder(userName);
    res.status(200).json({});
        
}

