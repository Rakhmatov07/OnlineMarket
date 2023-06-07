const { Router } = require('express');
const { isAuth } = require('../middlewares/isAuth');
const { isOwn } = require('../middlewares/isOwnReview');
const { createReview, showAllReview, editReview, deleteReview } = require('../controllers/reviews.controller');
const router = Router();

router.post('/review/create/:productId', isAuth, createReview);
router.get('/review/showreviews', showAllReview);
router.put('/review/edit/:id', isAuth, isOwn, editReview);
router.delete('/review/delete/:id', isAuth, isOwn, deleteReview); 


module.exports = router;