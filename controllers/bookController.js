const Book = require('../models/Book');
const mongoose = require('mongoose');

exports.getAllBooks = async (req , res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch(error) {
        res.status(500).json({ message: 'Error retrieving books', error});
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(!book) {
            return res.status(404).json({ message: 'Book not found'});
        }
        res.status(200).json(book);
    } catch(error) {
        res.status(500).json({ message: 'Error retrieving book', error });
    }
};

exports.addBook = async (req, res) => {
    try {
        const newBook = new Book(req.body);
        const validationError = newBook.validateSync();
        if (validationError) {
            return res.status(400).json({ message: 'Validation error', error: validationError });
        }
        await newBook.save();
        res.status(201).json(newBook);
    } catch(error) {
        res.status(500).json({ message: 'Error adding book', error });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        const validationError = updatedBook.validateSync();
        if (validationError) {
            return res.status(400).json({ message: 'Validation error', error: validationError });
        }
        if(!updatedBook) {
            return res.status(404).json({ message: 'Book not found'});
        }
        res.status(200).json(updatedBook);
    } catch (error) { 
        res.status(500).json({ message: 'Error updating book', error });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if(!deletedBook) {
            return res.status(404).json({ message: 'Book not found'});
        }
        res.status(200).json({ message: 'Book deleted successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error });
    }
};

exports.uploadBookCover = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });

        const coverImage = {
            data: req.file.buffer,
            contentType: req.file.mimetype
        };

        book.coverImage = coverImage;
        await book.save();

        res.status(200).json({ message: "Book cover uploaded", coverImage: coverImage });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
