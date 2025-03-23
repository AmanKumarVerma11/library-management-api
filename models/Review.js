const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const reviewSchema = new mongoose.Schema({
    _id: Number,
    bookId: {
        type: Number,
        required: true,
        ref: "Book"
    },
    userId: {
        type: Number,
        required: true,
        ref: "User"
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    review: {
        type: String,
        required: true
    }
}, { _id: false, timestamps: true });

reviewSchema.plugin(AutoIncrement, { id: "review_seq", inc_field: "_id" });
module.exports = mongoose.model("Review", reviewSchema);