const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipes');

//app routes

//create recipes
router.get('/new', recipesController.new);
//all recipes
router.get('/all', recipesController.all); 
//individual recipe
router.get('/:id', recipesController.one)
//post
router.post('/', recipesController.create)
//posting comment
router.post('/comment/:id', recipesController.comment)



module.exports = router;