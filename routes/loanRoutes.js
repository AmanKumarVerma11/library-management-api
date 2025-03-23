const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

/**
 * @swagger
 * tags:
 *   name: Loans
 *   description: Loan management
 */

/**
 * @swagger
 * /loans:
 *   get:
 *     summary: Retrieve a list of loans
 *     tags: [Loans]
 *     responses:
 *       200:
 *         description: A list of loans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Loan'
 */

/**
 * @swagger
 * /loans:
 *   post:
 *     summary: Create a new loan
 *     tags: [Loans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Loan'
 *     responses:
 *       201:
 *         description: The loan was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Loan'
 */

/**
 * @swagger
 * /loans/{id}:
 *   put:
 *     summary: Update a loan
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The loan id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Loan'
 *     responses:
 *       200:
 *         description: The loan was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Loan'
 *       404:
 *         description: The loan was not found
 *       500:
 *         description: Some error happened
 */

/**
 * @swagger
 * /loans/{id}:
 *   delete:
 *     summary: Delete a loan
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The loan id
 *     responses:
 *       200:
 *         description: The loan was successfully deleted
 *       404:
 *         description: The loan was not found
 *       500:
 *         description: Some error happened
 */

router.get('/loans', loanController.getAllLoans);

router.post('/loans', loanController.createLoan);

router.put('/loans/:id', loanController.updateLoan);

router.delete('/loans/:id', loanController.deleteLoan);

module.exports = router;