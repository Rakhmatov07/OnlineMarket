const IO = require('../utils/io');
const Review = new IO('./database/reviews.json');
const Product = new IO('./database/products.json');
const validation = require('../validations/review.validation');
const Model = require('../models/review.model');



const createReview = async(req, res) => {
    try{
            // Read elements
        const products = await Product.read();
        const reviews = await Review.read();
        const { username, rating, message } = req.body;
        const { productId } = req.params;
        const userId = req.userId;
            // Validate Input
        const error = validation({username, rating, message});
        if(error){
            return res.status(403).json({error});
        }
            // Check the Review exists or not
        const findProduct = products.find((product) => product.id === productId);
        const findReview = reviews.find((review) => review.username === username && review.rating === rating && Review.info === info && review.productId.includes(productId));
            // If exist send response with 400 status code
        if(findReview){
            return res.status(403).json({message: "Review is already exist!"});
        }

        const newReview = new Model(username, rating, message, userId);
        newReview.productId.push(productId);
        if(findProduct){
            findProduct.reviews.push({
                username,
                rating,
                message,
                userId
            })
        }

        const data = reviews.length ? [...reviews, newReview] : [newReview];

        await Review.write(data);
        await Product.write(products);
        res.status(201).json({message: "Created"});
    }catch(error){
        res.status(401).json(error);
    }
}

const showAllReview = async(req, res) => {
    const reviews = await Review.read();
    res.status(200).json({message: "Success", reviews});
}

const editReview = async(req, res) => {
    try {
            // Read elements
        const {id} = req.params;
        const { rating, message } = req.body
            // Edit review
        const result = await Review.update(id, { rating, message });
        if(result){
            return res.status(401).json(result)
        }

        res.status(200).json({message: "Edited"});
    } catch (error) {
        res.status(401).json(error);
    }
}

const deleteReview = async(req, res) => {
    try {
        const reviews = await Review.read();
        const {id} = req.params;
        const findReviews = reviews.filter((review) => review.id !== id);
        await Review.write(findReviews);
    
        res.status(200).json({message: "Deleted"});
    } catch (error) {
        res.status(401).json(error);
    }

}

module.exports = {
    createReview,
    showAllReview,
    editReview,
    deleteReview
}