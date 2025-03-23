const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const authorSchema = new mongoose.Schema({
    _id: Number,
    name: { 
        type: String, 
        required: true 
    },
    bio: { 
        type: String 
    },
    birthdate: {
        type: Date
    }
}, { _id: false });

authorSchema.plugin(AutoIncrement, { id: "author_seq", inc_field: "_id" });

module.exports = mongoose.model("Author", authorSchema);