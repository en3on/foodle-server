require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

const routes = require('./routes/index.js');

app.use(express.json());
app.use(cors());
app.use(routes);

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}, (err) => {
  console.log(err || 'Connected to mongodb');
});

app.listen(process.env.PORT, () => {
  console.log('Listening on ' + process.env.PORT);
});
