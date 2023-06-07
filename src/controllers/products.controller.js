const IO = require('../utils/io');
const Product = new IO('./database/products.json');
const validation = require('../validations/product.validation');
const Model = require('../models/poruct.model');



const createProduct = async(req, res) => {
    try{
            // Read elements
        const products = await Product.read();
        const { name, price, info } = req.body;
        const userId = req.userId;
            // Validate Input
        const error = validation({name, price, info});
        if(error){
            return res.status(403).json({error});
        }
            // Check the product exists or not
        const findProduct = products.find((product) => product.name === name && product.price === price && product.info === info);
            // If exist send response with 400 status code
        if(findProduct){
            return res.status(403).json({message: "Product is already exist!"});
        }

        const newProduct = new Model(name, price, userId, info);
        const data = products.length ? [...products, newProduct] : [newProduct];

        await Product.write(data);
        res.status(201).json({message: "Created"});
    }catch(error){
        res.status(401).json(error);
    }
}

const showAllProducts = async(req, res) => {
    const products = await Product.read();
    res.status(200).json({message: "Success", products});
}

const showSingleProduct = async(req, res) => {
    try {
        const products = await Product.read();
        const {id} = req.params;
        const findProduct = products.find((product) => product.id === id);
        if(!findProduct){
            return res.status(404).json({message: "Not Found"});
        }

        res.status(200).json({message: "Success", findProduct});
    } catch (error) {
        res.status(401).json(error);
    }

}

const editProduct = async(req, res) => {
    try {
            // Read elements
        const {id} = req.params;
        const { name, price, info } = req.body
            // Edit product
        const result = await Product.update(id, { name, price, info });
        if(result){
            return res.status(401).json(result)
        }

        res.status(200).json({message: "Edited"});
    } catch (error) {
        res.status(401).json(error);
    }
}

const deleteProduct = async(req, res) => {
    try {
        const products = await Product.read();
        const {id} = req.params;
        const findProducts = products.filter((product) => product.id !== id);
        await Product.write(findProducts);
    
        res.status(200).json({message: "Deleted"});
    } catch (error) {
        res.status(401).json(error);
    }

}

module.exports = {
    createProduct,
    showAllProducts,
    showSingleProduct,
    editProduct,
    deleteProduct
}