const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);


const loanSchema = new mongoose.Schema({
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
    issueDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    returnDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ["issued", "returned"],
        default: "issued"
    }
}, { _id: false });

loanSchema.plugin(AutoIncrement, { id: "loan_seq", inc_field: "_id" });

module.exports = mongoose.model("Loan", loanSchema);