const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/login', userController.getUserByUserName);
router.post('/add-to-cart/:productId', userController.saveToShoppingCart);
router.get('/shopping-list', userController.getShoppingCartListByUserName);
router.post('/add-quantity/:shoppingId', userController.addQuantity);
router.post('/decrease-quantity/:shoppingId', userController.decreaseQuantity);
router.get('/shopping-list', userController.getShoppingCartListByUserName);
router.post('/place-order', userController.placeOrder);
module.exports = router;