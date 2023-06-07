const IO = require('../utils/io');
const Product = new IO('./database/products.json');


const isOwn = async(req, res, next) => {
    try{
            // Read elements
        const products = await Product.read();
        const { id } = req.params;
        const userId = req.userId;
        const findProduct = products.find((product) => product.id === id);
        if(findProduct.userId === userId) {
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