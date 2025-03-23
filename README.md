# Library Management API

A comprehensive RESTful API for managing a library system, including books, authors, users, loans, and reviews.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
  - [Books](#books)
  - [Authors](#authors)
  - [Users](#users)
  - [Loans](#loans)
  - [Reviews](#reviews)
- [Data Models](#data-models)
- [Error Handling](#error-handling)
- [API Usage Examples](#api-usage-examples)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd library-management-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

- `MONGO_URI`: MongoDB connection string
- `PORT`: Port number for the server (defaults to 3000 if not specified)

## Running the Application

Development mode:
```
npx nodemon server.js
```

Production mode:
```
npm start
```

The API will be available at `http://localhost:3000`

Swagger documentation is available at `http://localhost:3000/api-docs`

## API Documentation

### Books

#### Get All Books
- **Endpoint**: `GET /books`
- **Description**: Retrieve all books in the library
- **Query Parameters**:
  - `limit` (optional): Limit the number of results
  - `page` (optional): Page number for pagination
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    [
      {
        "_id": 1,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "publishedYear": 1925,
        "coverImage": {
          "data": "...",
          "contentType": "image/jpeg"
        }
      },
      ...
    ]
    ```
- **Error Response**:
  - **Code**: 500 Internal Server Error
  - **Content**:
    ```json
    {
      "message": "Error retrieving books",
      "error": "..."
    }
    ```

#### Get Book by ID
- **Endpoint**: `GET /books/:id`
- **Description**: Retrieve a specific book by ID
- **URL Parameters**:
  - `id`: Book ID
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "_id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "publishedYear": 1925,
      "coverImage": {
        "data": "...",
        "contentType": "image/jpeg"
      }
    }
    ```
- **Error Responses**:
  - **Code**: 404 Not Found
    ```json
    { "message": "Book not found" }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    { "message": "Error retrieving book", "error": "..." }
    ```

#### Create Book
- **Endpoint**: `POST /books`
- **Description**: Add a new book to the library
- **Request Body**:
  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "publishedYear": 2023
  }
  ```
- **Success Response**:
  - **Code**: 201 Created
  - **Content**:
    ```json
    {
      "_id": 3,
      "title": "Book Title",
      "author": "Author Name",
      "publishedYear": 2023
    }
    ```
- **Error Responses**:
  - **Code**: 400 Bad Request
    ```json
    { "message": "Validation error", "error": "..." }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    { "message": "Error adding book", "error": "..." }
    ```

#### Update Book
- **Endpoint**: `PUT /books/:id`
- **Description**: Update an existing book
- **URL Parameters**:
  - `id`: Book ID
- **Request Body**:
  ```json
  {
    "title": "Updated Title",
    "author": "Updated Author",
    "publishedYear": 2023
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "_id": 1,
      "title": "Updated Title",
      "author": "Updated Author",
      "publishedYear": 2023
    }
    ```
- **Error Responses**:
  - **Code**: 400 Bad Request
    ```json
    { "message": "Validation error", "error": "..." }
    ```
  - **Code**: 404 Not Found
    ```json
    { "message": "Book not found" }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    { "message": "Error updating book", "error": "..." }
    ```

#### Delete Book
- **Endpoint**: `DELETE /books/:id`
- **Description**: Remove a book from the library
- **URL Parameters**:
  - `id`: Book ID
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    { "message": "Book deleted successfully" }
    ```
- **Error Responses**:
  - **Code**: 404 Not Found
    ```json
    { "message": "Book not found" }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    { "message": "Error deleting book", "error": "..." }
    ```

#### Upload Book Cover
- **Endpoint**: `POST /books/:id/upload-cover`
- **Description**: Upload a cover image for a book
- **URL Parameters**:
  - `id`: Book ID
- **Request Body**: Form data with field name `coverImage` containing the image file
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    { "message": "Book cover uploaded", "coverImage": "..." }
    ```
- **Error Responses**:
  - **Code**: 400 Bad Request
    ```json
    { "message": "No file uploaded" }
    ```
  - **Code**: 404 Not Found
    ```json
    { "message": "Book not found" }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    { "message": "Error message", "error": "..." }
    ```

### Authors

#### Get All Authors
- **Endpoint**: `GET /authors`
- **Description**: Retrieve all authors
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    [
      {
        "_id": 1,
        "name": "F. Scott Fitzgerald",
        "bio": "American novelist...",
        "birthdate": "1896-09-24T00:00:00.000Z"
      },
      ...
    ]
    ```
- **Error Response**:
  - **Code**: 500 Internal Server Error
  - **Content**:
    ```json
    { "message": "Error message" }
    ```

#### Get Author by ID
- **Endpoint**: `GET /authors/:id`
- **Description**: Retrieve a specific author by ID
- **URL Parameters**:
  - `id`: Author ID
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "_id": 1,
      "name": "F. Scott Fitzgerald",
      "bio": "American novelist...",
      "birthdate": "1896-09-24T00:00:00.000Z"
    }
    ```
- **Error Responses**:
  - **Code**: 404 Not Found
    ```json
    { "message": "Author not found" }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    { "message": "Error message" }
    ```

#### Create Author
- **Endpoint**: `POST /authors`
- **Description**: Add a new author
- **Request Body**:
  ```json
  {
    "name": "Author Name",
    "bio": "Author biography",
    "birthdate": "1990-01-01"
  }
  ```
- **Success Response**:
  - **Code**: 201 Created
  - **Content**:
    ```json
    {
      "_id": 3,
      "name": "Author Name",
      "bio": "Author biography",
      "birthdate": "1990-01-01T00:00:00.000Z"
    }
    ```
- **Error Responses**:
  - **Code**: 400 Bad Request
    ```json
    { "message": "Name is required" }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    { "message": "Error message" }
    ```

#### Update Author
- **Endpoint**: `PUT /authors/:id`
- **Description**: Update an existing author
- **URL Parameters**:
  - `id`: Author ID
- **Request Body**:
  ```json
  {
    "name": "Updated Name",
    "bio": "Updated biography",
    "birthdate": "1990-01-01"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "_id": 1,
      "name": "Updated Name",
      "bio": "Updated biography",
      "birthdate": "1990-01-01T00:00:00.000Z"
    }
    ```
- **Error Responses**:
  - **Code**: 404 Not Found
    ```json
    { "message": "Author not found" }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    { "message": "Error message" }
    ```

#### Delete Author
- **Endpoint**: `DELETE /authors/:id`
- **Description**: Remove an author
- **URL Parameters**:
  - `id`: Author ID
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    { "message": "Author deleted" }
    ```
- **Error Responses**:
  - **Code**: 404 Not Found
    ```json
    { "message": "Author not found" }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    { "message": "Error message" }
    ```

### Users

#### Get All Users
- **Endpoint**: `GET /users`
- **Description**: Retrieve all users
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    [
      {
        "_id": 1,
        "name": "John Doe",
        "email": "john@example.com"
      },
      ...
    ]
    ```
- **Error Response**:
  - **Code**: 500 Internal Server Error
  - **Content**:
    ```json
    { "message": "Error message" }
    ```

#### Get User by ID
- **Endpoint**: `GET /users/:id`
- **Description**: Retrieve a specific user by ID
- **URL Parameters**:
  - `id`: User ID
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "_id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
    ```
- **Error Responses**:
  - **Code**: 404 Not Found
    ```json
    { "message": "User not found" }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    { "message": "Error message" }
    ```

#### Create User
- **Endpoint**: `POST /users`
- **Description**: Create a new user
- **Request Body**:
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "password"
  }
  ```
- **Success Response**:
  - **Code**: 201 Created
  - **Content**:
    ```json
    {
      "_id": 3,
      "name": "User Name",
      "email": "user@example.com"
    }
    ```
- **Error Responses**:
  - **Code**: 400 Bad Request
    ```json
    { "message": "All fields are required" }
    ```
    ```json
    { "message": "Email already exists" }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    { "message": "Error message" }
    ```

#### Update User
- **Endpoint**: `PUT /users/:id`
- **Description**: Update an existing user
- **URL Parameters**:
  - `id`: User ID
- **Request Body**:
  ```json
  {
    "name": "Updated Name",
    "email": "updated@example.com",
    "password": "newpassword"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "_id": 1,
      "name": "Updated Name",
      "email": "updated@example.com"
    }
    ```
- **Error Responses**:
  - **Code**: 404 Not Found
    ```json
    { "message": "User not found" }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    { "message": "Error message" }
    ```

#### Delete User
- **Endpoint**: `DELETE /users/:id`
- **Description**: Remove a user
- **URL Parameters**:
  - `id`: User ID
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    { "message": "User deleted" }
    ```
- **Error Responses**:
  - **Code**: 404 Not Found
    ```json
    { "message": "User not found" }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    { "message": "Error message" }
    ```

#### Upload Profile Picture
- **Endpoint**: `POST /users/:id/upload-profile-picture`
- **Description**: Upload a profile picture for a user
- **URL Parameters**:
  - `id`: User ID
- **Request Body**: Form data with field name `profilePicture` containing the image file
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    { "message": "Profile picture uploaded" }
    ```
- **Error Responses**:
  - **Code**: 400 Bad Request
    ```json
    { "message": "No file uploaded" }
    ```
  - **Code**: 404 Not Found
    ```json
    { "message": "User not found" }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    { "message": "Error message" }
    ```

### Loans

#### Get All Loans
- **Endpoint**: `GET /loans`
- **Description**: Retrieve all loans, with book and user details
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    [
      {
        "_id": 1,
        "bookId": {
          "_id": 1,
          "title": "The Great Gatsby",
          "author": "F. Scott Fitzgerald"
        },
        "userId": {
          "_id": 1,
          "name": "John Doe",
          "email": "john@example.com"
        },
        "issueDate": "2023-06-01T10:00:00.000Z",
        "status": "issued"
      },
      ...
    ]
    ```
- **Empty Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    { "message": "0 loans right now" }
    ```
- **Error Response**:
  - **Code**: 500 Internal Server Error
  - **Content**:
    ```json
    { "message": "Error message" }
    ```

#### Create Loan
- **Endpoint**: `POST /loans`
- **Description**: Create a new loan record (borrow a book)
- **Request Body**:
  ```json
  {
    "bookId": 1,
    "userId": 1
  }
  ```
- **Success Response**:
  - **Code**: 201 Created
  - **Content**:
    ```json
    {
      "_id": 1,
      "bookId": 1,
      "userId": 1,
      "issueDate": "2023-06-01T10:00:00.000Z",
      "status": "issued"
    }
    ```
- **Error Responses**:
  - **Code**: 400 Bad Request
    ```json
    { "message": "Book not found" }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    { "message": "Error message" }
    ```

#### Update Loan
- **Endpoint**: `PUT /loans/:id`
- **Description**: Update a loan (typically used to return a book)
- **URL Parameters**:
  - `id`: Loan ID
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "_id": 1,
      "bookId": 1,
      "userId": 1,
      "issueDate": "2023-06-01T10:00:00.000Z",
      "returnDate": "2023-06-15T10:00:00.000Z",
      "status": "returned"
    }
    ```
- **Error Responses**:
  - **Code**: 404 Not Found
    ```json
    { "message": "Loan not found" }
    ```
  - **Code**: 400 Bad Request
    ```json
    { "message": "Loan already returned" }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    { "message": "Error message" }
    ```

#### Delete Loan
- **Endpoint**: `DELETE /loans/:id`
- **Description**: Delete a loan record
- **URL Parameters**:
  - `id`: Loan ID
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    { "message": "Loan deleted and marked as returned" }
    ```
- **Error Responses**:
  - **Code**: 404 Not Found
    ```json
    { "message": "Loan not found" }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    { "message": "Error message" }
    ```

### Reviews

#### Get Reviews for a Book
- **Endpoint**: `GET /books/:id/reviews`
- **Description**: Get all reviews for a specific book
- **URL Parameters**:
  - `id`: Book ID
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    [
      {
        "_id": 1,
        "bookId": {
          "_id": 1,
          "title": "The Great Gatsby",
          "author": "F. Scott Fitzgerald"
        },
        "userId": {
          "_id": 1,
          "name": "John Doe",
          "email": "john@example.com"
        },
        "rating": 5,
        "review": "Amazing book!",
        "createdAt": "2023-06-01T10:00:00.000Z",
        "updatedAt": "2023-06-01T10:00:00.000Z"
      },
      ...
    ]
    ```
- **Error Responses**:
  - **Code**: 404 Not Found
    ```json
    { "message": "Review not found" }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    { "message": "Error message" }
    ```

#### Add Review for a Book
- **Endpoint**: `POST /books/:id/reviews`
- **Description**: Add a review for a specific book
- **URL Parameters**:
  - `id`: Book ID
- **Request Body**:
  ```json
  {
    "userId": 1,
    "rating": 5,
    "review": "Great book!"
  }
  ```
- **Success Response**:
  - **Code**: 201 Created
  - **Content**:
    ```json
    {
      "_id": 1,
      "bookId": 1,
      "userId": 1,
      "rating": 5,
      "review": "Great book!",
      "createdAt": "2023-06-01T10:00:00.000Z",
      "updatedAt": "2023-06-01T10:00:00.000Z"
    }
    ```
- **Error Responses**:
  - **Code**: 404 Not Found
    ```json
    { "message": "Book not found" }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    { "message": "Error message" }
    ```

#### Update Review
- **Endpoint**: `PUT /reviews/:_id/:bookId`
- **Description**: Update a review
- **URL Parameters**:
  - `_id`: Review ID
  - `bookId`: Book ID
- **Request Body**:
  ```json
  {
    "rating": 4,
    "review": "Updated opinion: Good book but not great"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "_id": 1,
      "bookId": 1,
      "userId": 1,
      "rating": 4,
      "review": "Updated opinion: Good book but not great",
      "createdAt": "2023-06-01T10:00:00.000Z",
      "updatedAt": "2023-06-02T10:00:00.000Z"
    }
    ```
- **Error Responses**:
  - **Code**: 404 Not Found
    ```json
    { "message": "Review not found" }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    { "message": "Error message" }
    ```

#### Delete Review
- **Endpoint**: `DELETE /reviews/:_id/:bookId`
- **Description**: Delete a review
- **URL Parameters**:
  - `_id`: Review ID
  - `bookId`: Book ID
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    { "message": "Review deleted" }
    ```
- **Error Responses**:
  - **Code**: 404 Not Found
    ```json
    { "message": "Review not found" }
    ```
  - **Code**: 500 Internal Server Error
    ```json
    { "message": "Error message" }
    ```

## Data Models

### Book
```javascript
{
  _id: Number,
  title: String (required),
  author: String (required),
  publishedYear: Number (required),
  coverImage: {
    data: Buffer,
    contentType: String
  }
}
```

### Author
```javascript
{
  _id: Number,
  name: String (required),
  bio: String,
  birthdate: Date
}
```

### User
```javascript
{
  _id: Number,
  name: String (required),
  email: String (required, unique),
  password: String (required),
  profilePicture: {
    data: Buffer,
    contentType: String
  }
}
```

### Loan
```javascript
{
  _id: Number,
  bookId: Number (required, reference to Book),
  userId: Number (required, reference to User),
  issueDate: Date (required, default: current date),
  returnDate: Date,
  status: String (enum: ["issued", "returned"], default: "issued")
}
```

### Review
```javascript
{
  _id: Number,
  bookId: Number (required, reference to Book),
  userId: Number (required, reference to User),
  rating: Number (required, min: 1, max: 5),
  review: String (required),
  timestamps: true (createdAt, updatedAt)
}
```

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200` - Success: The request was successfully processed
- `201` - Created: A resource was successfully created
- `400` - Bad Request: The request could not be understood or was missing required parameters
- `404` - Not Found: The requested resource could not be found
- `500` - Server Error: An error occurred on the server

Error responses include a message explaining the error and sometimes additional error details.

## API Usage Examples

### Complete Loan Workflow

1. **Create a user**:
```
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

2. **Add a book**:
```
POST /books
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "publishedYear": 1925
}
```

3. **Create a loan (borrow the book)**:
```
POST /loans
Content-Type: application/json

{
  "bookId": 1,
  "userId": 1
}
```

4. **Return the book**:
```
PUT /loans/1
```

5. **Add a review for the book**:
```
POST /books/1/reviews
Content-Type: application/json

{
  "userId": 1,
  "rating": 5,
  "review": "A masterpiece that captures the essence of the American Dream."
}
```

6. **Get all reviews for the book**:
```
GET /books/1/reviews
```
