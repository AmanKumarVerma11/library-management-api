const Author = require("../models/Author");

exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) return res.status(404).json({ message: "Author not found" });
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createAuthor = async (req, res) => {
    try {
        const { name, bio, birthdate } = req.body;
        if (!name) return res.status(400).json({ message: "Name is required" });

        const newAuthor = new Author({ name, bio, birthdate });
        await newAuthor.save();
        res.status(201).json(newAuthor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateAuthor = async (req, res) => {
    try {
        const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAuthor) return res.status(404).json({ message: "Author not found" });
        res.status(200).json(updatedAuthor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteAuthor = async (req, res) => {
    try {
        const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
        if (!deletedAuthor) return res.status(404).json({ message: "Author not found" });
        res.status(200).json({ message: "Author deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
