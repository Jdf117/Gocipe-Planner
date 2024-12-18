const express = require('express');
const Recipe = require('../models/recipeSchema'); 

const router = express.Router();

//get recipe list 
router.get('/', async (req, res) => {
    try{
        console.log("Finding recipes")
        const recipes = await Recipe.find();

        if(recipes.length > 0){
            console.log("Recipes exist!");
            res.status(200).json(recipes);
        } else {
            console.log("No recipes found!");
            res.status(200).send("No recipes in database!");
        }
    } catch (err){
        console.log("Could not get recipes", err);
    }
});

//add recipe
router.post('/addRecipe', async (req, res) => {
    console.log("Incoming request body", req.body);
    const { name, ingredients, instructions, category, userId} = req.body;

    try{
        const recipe = new Recipe({name, ingredients, instructions, category, userId});
        console.log(recipe)
        await recipe.save();
        res.status(201).send(recipe);
    } catch (err) {
        console.log("Could not add recipe");
    }
});

//get recipes based on user Id
router.get('/:userId', async (req, res) => {
    try{
        const recipes = await Recipe.find({userId: req.params.userId});
        if (recipes.length > 0) {
            res.status(200).send(recipes);
        } else {
            res.status(404).send("No recipes found for this user");
        }
    } catch(err){
        console.log(`Error fetching recipes by ${userId}`)
        res.status(404).send("User does not have any recipes");
    }
});

//edit recipe

//Delete recipe based on userId
module.exports = router;