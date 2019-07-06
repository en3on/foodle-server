const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe.js');
const Ingredient = require('../models/Ingredient.js');

const {createFakeRecipes} = require('../utils/utils.js');

async function createRecipe(req, res) {
  const {name, ingredients} = req.body;

  const newRecipe = new Recipe({
    _id: mongoose.Types.ObjectId(),
    name: name,
  });

  for (i = 0; i < ingredients.length; i++) {
    const newIngredient = new Ingredient({
      _id: mongoose.Types.ObjectId(),
      name: ingredients[i],
    });

    try {
      await newIngredient.save();
    } catch (err) {
      res.status(500).json(err);
    }

    newRecipe.ingredients.push(newIngredient.id);
  };

  try {
    await newRecipe.save();
    res.status(201).send(`${newRecipe.name} was created successfully`);
  } catch (err) {
    res.status(500).json(err);
  };
}

async function getRecipes(req, res) {
  try {
    const recipes = await Recipe.find().populate('ingredients')

    return res.status(200).json(recipes);
  } catch (err) {
    return res.status(err.status || 500).json(err);
  }
};

async function getOneRecipe(req, res) {
  const {id:recipeId} = req.params;

  try {
    await Recipe.findOne({_id: recipeId})
      .populate('ingredients')
      .exec((err, recipe) => {
        err && res.status(400).send(err);
        res.status(200).json(recipe);
      })

  } catch (err) {
    res.status(400).send(err);
  };
};

async function seedRecipes(req, res) {
  // drop all recipes
  await Recipe.deleteMany();
  await Ingredient.deleteMany();
  console.log('Deleted recipes');
  const recipes = await createFakeRecipes(10);

  try {
    await Recipe.insertMany(recipes);
    return res.status(201).send('Successfully seeded database');
  } catch (err) {
    return res.status(400).send(err);
  };
};

module.exports = {
  createRecipe,
  getRecipes,
  getOneRecipe,
  seedRecipes,
};
