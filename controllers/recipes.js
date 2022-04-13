const Recipes = require('../models/recipes');
const Users = require('../models/user');


module.exports = {
    // index,
    new: newRecipe,
    create: createRecipe,
    one,
    all,
    comment: addComment,
};

// function index(req, res){
//     res.render('recipes/index')
// }

function newRecipe(req, res) {
    res.render('recipes/new')
}

function createRecipe(req,res) {
    Recipes.create(req.body, function(err, recipe) {
        if (err) {
            console.log(err)
        }
        const user = req.user;
        user.originalRecipes.push(recipe._id);
        user.save();
        res.redirect('recipes/all')
    })
}

function one(req,res) {
    Recipes.findById(req.params.id, function(err, recipe) {
        if (err) console.log(err)
        res.render("recipes/individual", {
            recipe
        })
    })
}

function all(req, res){
    Recipes.find({}, function(err, recipes) {
        console.log(recipes)
        if(err) {
            console.log(err)
        }
        res.render("recipes/all", {
            recipes
        })
    });
};

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