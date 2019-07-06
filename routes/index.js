const express = require('express');
const router = express.Router();

router.use('/recipes', require('./recipe-routes.js'));

module.exports = router;
