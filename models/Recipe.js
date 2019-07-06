const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }],
});

module.exports = mongoose.model('Recipe', RecipeSchema);
