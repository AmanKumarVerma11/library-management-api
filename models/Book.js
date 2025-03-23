const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const bookSchema = new mongoose.Schema({
    _id: Number,
    title: { 
        type: String, 
        required: true 
    },
    author: { 
        type: String, 
        required: true 
    },
    publishedYear: {
        type: Number, 
        required: true 
    },
    coverImage: {
        data: Buffer,
        contentType: String
    }
}, { _id: false });

bookSchema.plugin(AutoIncrement, { id: "book_seq", inc_field: "_id" });

module.exports = mongoose.model("Book", bookSchema);