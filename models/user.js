const mongoose = require('mongoose');
const Recipes = require('./recipes');

const recipeSchema = Recipes;

const userSchema = new mongoose.Schema({
    name: String,
    googleId: {
      type: String,
      required: true
    },
    email: String,
    avatar: String,
    likedRecipes: [Number],
    originalRecipes: [ recipeSchema ],
  });

module.exports = mongoose.model('User', userSchema);

// mongoose.connection.collections['recipes'].drop(function(err) {
//     console.log('collection dropped')
// })