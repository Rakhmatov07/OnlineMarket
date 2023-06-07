const { v4: uuid } = require('uuid');

class Review{
    constructor(username, rating, message, userId){
        this.id = uuid(),
        this.username = username,
        this.rating = rating,
        this.message = message,
        this.userId = userId,
        this.productId = [],
        this.createdAt = new Date()
    }
}

module.exports = Review;