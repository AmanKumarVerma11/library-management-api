const Loan = require("../models/Loan");
const Book = require("../models/Book");

exports.getAllLoans = async (req, res) => {
    try {
        const loans = await Loan.find().populate("bookId", "title author").populate("userId", "name email");

        if (loans.length === 0) {
            return res.status(200).json({ message: "0 loans right now" });
        }

        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createLoan = async (req, res) => {
    try {
        const { bookId, userId } = req.body;
        const book = await Book.findOne({ _id: bookId });
        if (!book) return res.status(400).json({ message: "Book not found" });

        const newLoan = new Loan({ bookId, userId });
        await newLoan.save();

        res.status(201).json(newLoan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateLoan = async (req, res) => {
    try {
        const updatedLoan = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedLoan) return res.status(404).json({ message: "Loan not found" });

        if(updatedLoan.status === "returned") {
            return res.status(400).json({ message: "Loan already returned" });
        }

        updatedLoan.status = "returned";
        updatedLoan.returnDate = new Date();
        await updatedLoan.save();

        res.status(200).json(updatedLoan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteLoan = async (req, res) => {
    try {
        const loan = await Loan.findById(req.params.id);
        if (!loan) return res.status(404).json({ message: "Loan not found" });

        if (loan.status !== "returned") {
            loan.status = "returned";
            loan.returnDate = new Date();
            await loan.save();
        }

        await Loan.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Loan deleted and marked as returned" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};