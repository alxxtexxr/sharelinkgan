const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import routes
const users = require('./routes/users');
const links = require('./routes/links');

// Import helpers
const errorHandler = require('./helpers/error-handler');

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/share-link-gan', {useNewUrlParser: true, useCreateIndex: true});

app.use(bodyParser.json());

// Use routes
app.use('/api', links);
app.use('/api', users);

app.use(errorHandler);

app.listen(port, function () {
    console.log(`Listening on ${port}`);
});