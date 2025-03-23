const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.log(error));

const bookRoutes = require('./routes/bookRoutes');
app.use('/', bookRoutes);

const authorRoutes = require('./routes/authorRoutes');
app.use('/', authorRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);

const loanRoutes = require('./routes/loanRoutes');
app.use('/', loanRoutes);

const reviewRoutes = require('./routes/reviewRoutes');
app.use('/', reviewRoutes);

const swaggerSetup = require('./config/swagger');
swaggerSetup(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});