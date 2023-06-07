const IO = require('../utils/io');
const Review = new IO('./database/reviews.json');


const isOwn = async(req, res, next) => {
    try{
            // Read elements
        const reviews = await Review.read();
        const { id } = req.params;
        const userId = req.userId;
        const findReview = reviews.find((review) => review.id === id);
        console.log(findReview);
        if(findReview.userId === userId) {
            next();
        }else{
            res.status(400).json({message: "You can not edit."});
        }
    }catch(error){
        res.status(401).json(error.message);
    }
}

module.exports = {
    isOwn
};