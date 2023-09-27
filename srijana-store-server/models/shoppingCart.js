module.exports = class ShoppingCart{
    constructor(productId,name,price){
        this.id = Math.random().toString();
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.total = price * 1;
        this.quantity = 1;

    }
}