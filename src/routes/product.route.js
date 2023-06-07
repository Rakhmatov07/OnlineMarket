const { Router } = require('express');
const { createProduct, showAllProducts, showSingleProduct, editProduct, deleteProduct } = require('../controllers/products.controller');
const { isAuth } = require('../middlewares/isAuth');
const { isOwn } = require('../middlewares/isOwn.product');
const router = Router();

router.post('/product/create', isAuth, createProduct);
router.get('/product', showAllProducts);
router.get('/product/:id', showSingleProduct);
router.put('/product/edit/:id', isAuth, isOwn, editProduct);
router.delete('/product/delete/:id', isAuth, isOwn, deleteProduct);
// router.get('/product/buy/:id', middleware, buy);


module.exports = router;