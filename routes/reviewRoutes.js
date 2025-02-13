const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/books/:id/reviews', reviewController.getReviewByBookId);

router.post('/books/:id/reviews', reviewController.addReview);

router.put('/reviews/:_id/:bookId', reviewController.updateReview);

router.delete('/reviews/:_id/:bookId', reviewController.deleteReview);

module.exports = router;