const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const offerRoutes = require('./routes/offer');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/flipkart-offers', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/offer', offerRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
