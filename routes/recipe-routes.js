const express = require('express');
const router = express.Router();
const {createRecipe, getRecipes, getOneRecipe, seedRecipes} = require('../controllers/recipe-controller.js');

router.get('/', getRecipes);
router.post('/', createRecipe);


router.get('/seed', seedRecipes);

router.get('/find/:id', getOneRecipe);

module.exports = router;
