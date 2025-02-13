const Review = require("../models/Review");
const Book = require("../models/Book");

exports.getReviewByBookId = async (req, res) => {
    try {

        const { id: bookId } = req.params;
        const reviews = await Review.find({ bookId }).populate("bookId","title author").populate("userId", "name email");

        if (!reviews) return res.status(404).json({ message: "Review not found" });

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addReview = async (req, res) => {
    try {
        const { id: bookId } = req.params;
        const { userId, rating, review } = req.body;

        const book = await Book.findById(bookId);

        if(!book) return res.status(404).json({ message: "Book not found" });

        const newReview = new Review({ bookId, userId, rating, review });
        
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateReview = async (req, res) => {
    try {
        const { _id: reviewId, bookId } = req.params;
        const { rating, review } = req.body;

        const updatedReview = await Review.findOneAndUpdate(
            { _id: reviewId, bookId }, 
            { rating, review }, 
            { new: true }
        );

        if (!updatedReview) return res.status(404).json({ message: "Review not found" });

        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const { _id: reviewId, bookId } = req.params;

        const delReview = await Review.findOneAndDelete({ _id: reviewId, bookId });

        if(!delReview) return res.status(404).json({ message: "Review not found" });

        res.status(200).json({ message: "Review deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}