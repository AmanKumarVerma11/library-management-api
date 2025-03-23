const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Library Management API',
            version: '1.0.0',
            description: 'API documentation for the Library Management System',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
        components: {
            schemas: {
                Author: {
                    type: 'object',
                    required: ['name'],
                    properties: {
                        _id: {
                            type: 'number',
                            description: 'The auto-generated id of the author',
                        },
                        name: {
                            type: 'string',
                            description: 'Name of the author',
                        },
                        bio: {
                            type: 'string',
                            description: 'Biography of the author',
                        },
                        birthdate: {
                            type: 'string',
                            format: 'date',
                            description: 'Birthdate of the author',
                        },
                    },
                },
                Book: {
                    type: 'object',
                    required: ['title', 'author', 'publishedYear'],
                    properties: {
                        _id: {
                            type: 'number',
                            description: 'The auto-generated id of the book',
                        },
                        title: {
                            type: 'string',
                            description: 'Title of the book',
                        },
                        author: {
                            type: 'string',
                            description: 'Author of the book',
                        },
                        publishedYear: {
                            type: 'number',
                            description: 'Published year of the book',
                        },
                        coverImage: {
                            type: 'string',
                            format: 'binary',
                            description: 'Cover image of the book',
                        },
                    },
                },
                Loan: {
                    type: 'object',
                    required: ['bookId', 'userId', 'issueDate'],
                    properties: {
                        _id: {
                            type: 'number',
                            description: 'The auto-generated id of the loan',
                        },
                        bookId: {
                            type: 'number',
                            description: 'ID of the book being loaned',
                        },
                        userId: {
                            type: 'number',
                            description: 'ID of the user borrowing the book',
                        },
                        issueDate: {
                            type: 'string',
                            format: 'date',
                            description: 'Date when the book was issued',
                        },
                        returnDate: {
                            type: 'string',
                            format: 'date',
                            description: 'Date when the book was returned',
                        },
                        status: {
                            type: 'string',
                            enum: ['issued', 'returned'],
                            description: 'Status of the loan',
                        },
                    },
                },
                Review: {
                    type: 'object',
                    required: ['bookId', 'userId', 'rating', 'review'],
                    properties: {
                        _id: {
                            type: 'number',
                            description: 'The auto-generated id of the review',
                        },
                        bookId: {
                            type: 'number',
                            description: 'ID of the book being reviewed',
                        },
                        userId: {
                            type: 'number',
                            description: 'ID of the user writing the review',
                        },
                        rating: {
                            type: 'number',
                            minimum: 1,
                            maximum: 5,
                            description: 'Rating given by the user',
                        },
                        review: {
                            type: 'string',
                            description: 'Review text',
                        },
                    },
                },
                User: {
                    type: 'object',
                    required: ['name', 'email', 'password'],
                    properties: {
                        _id: {
                            type: 'number',
                            description: 'The auto-generated id of the user',
                        },
                        name: {
                            type: 'string',
                            description: 'Name of the user',
                        },
                        email: {
                            type: 'string',
                            description: 'Email of the user',
                        },
                        password: {
                            type: 'string',
                            description: 'Password of the user',
                        },
                        profilePicture: {
                            type: 'string',
                            format: 'binary',
                            description: 'Profile picture of the user',
                        },
                    },
                },
            },
        },
    },
    apis: ['./routes/*.js'], // Path to the API routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};