const faker = require('faker');
const mongoose = require('mongoose');
const Ingredient = require('../models/Ingredient.js');
const Recipe = require('../models/Recipe.js');

async function createFakeRecipes(num) {
  console.log('Creating fake recipes');
  const recipes = [];
  for (i = 0; i < num; i++) {
    const newRecipe = {
      _id: mongoose.Types.ObjectId(),
      name: faker.lorem.word(),
      difficulty: Math.floor(Math.random() * 5),
    };

    const ingredients = await createFakeIngredients(Math.floor(Math.random() * 5));

    newRecipe.ingredients = ingredients.map((ingredient) => ingredient._id);

    recipes.push(newRecipe);

    console.log(`
      i: ${i}

      newRecipe:`
    );
    console.log(newRecipe);
  };
  return recipes;
}

async function createFakeIngredients(num) {
  const ingredients = [];

  for (x = 0; x < num; x++) {
    const newIngredient = {
      _id: mongoose.Types.ObjectId(),
      name: faker.lorem.word(),
    };

    ingredients.push(newIngredient);
  };
  await Ingredient.insertMany(ingredients);
  return ingredients;
}

module.exports = {
  createFakeRecipes,
};
