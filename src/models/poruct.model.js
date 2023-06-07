const { v4: uuid } = require('uuid');

class Product{
    constructor(name, price, userId, info){
        this.id = uuid(),
        this.name = name,
        this.price = price,
        this.userId = userId,
        this.info = info,
        this.reviews = [],
        this.createdAt = new Date()
    }
}

module.exports = Product;