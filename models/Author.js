const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: { type: String },
    birthdate: { type: Date },
});

module.exports = mongoose.model("Author", authorSchema);