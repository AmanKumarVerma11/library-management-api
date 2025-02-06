const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.log(error));

const bookRoutes = require('./routes/bookRoutes');
app.use('/api', bookRoutes);

const authorRoutes = require('./routes/authorRoutes');
app.use('/api', authorRoutes);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});