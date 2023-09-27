let products = [
    {id: 1 ,name:"Node.js" ,price:"9.99",image: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",stock:"8"},
    {id: 2, name:"React" ,price:"19.99",image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",stock:"5"},
    {id: 3, name:"Angular" ,price:"29.99",image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1920px-Angular_full_color_logo.svg.png",stock:"13"},

]; 
module.exports = class Product{
    constructor(id,name,price,image,stock){
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.stock = stock;

    }

    static fetchAll() {
        return products;
    }

    static findById(productId) {
        
        const index = products.findIndex(p => p.id == productId);
        if (index > -1) {
            return products[index];
        } else {
            throw new Error('NOT Found');
        }
    }

    update() {
        const index = products.findIndex(p => p.id === this.id);
        if (index > -1) {
            products.splice(index, 1, this);
            return this;
        } else {
            throw new Error('NOT Found');
        }

    }
}