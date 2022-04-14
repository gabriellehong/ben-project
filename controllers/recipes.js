const { Recipes } = require('../models/recipes');

module.exports = {
    new: newRecipe,
    create: createRecipe,
    one,
    all,
    comment: addComment,
};

//get render new recipe page
function newRecipe(req, res) {
    res.render('recipes/new')
}

//post new recipe, reroute to all recipes page after
//first posting new recipe to recipe database, then adding that recipe to the user's database to keep track of all the recipes they've created
function createRecipe(req,res) {
    Recipes.create(req.body, function(err, recipe) {
        if (err) {
            console.log(err)
        }
        const user = req.user;
        user.originalRecipes.push(recipe);
        console.log('user original recipe', user)
        user.save();
        res.redirect('recipes/all')
    })
}
//get one particular recipe
function one(req,res) {
    Recipes.findById(req.params.id, function(err, recipe) {
        if (err) console.log(err)
        res.render("recipes/individual", {
            recipe
        })
    })
}
//get all recipes
function all(req, res){
    Recipes.find({}, function(err, recipes) {
        if(err) {
            console.log(err)
        }
        res.render("recipes/all", {
            recipes
        })
    });
};
//post comment to specific recipe
function addComment(req, res) {
    const name = req.user.name;
    const date = new Date();
    Recipes.findById(req.params.id, function(err, recipe){
        if (err) console.log(err)
        const data = { name, date, ...req.body }
        recipe.comments.push(data)
        recipe.save()
        res.redirect(`/recipes/${recipe._id}`)
    })
}