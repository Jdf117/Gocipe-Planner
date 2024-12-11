const express = require('express');
const Recipe = require('../models/recipeSchema');

const router = express.Router();

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
        console.log("Could not get recipes");
    }
});

router.post('/addRecipe', async (req, res) => {
    console.log("Incoming request body", req.body);
    const { name, ingredients, instructions, category} = req.body;

    try{
        const recipe = new Recipe({name, ingredients, instructions, category});
        console.log(recipe)
        await recipe.save();
        res.status(201).send(recipe);
    } catch (err) {
        console.log("Could not add recipe");
    }
});

router.get('/:userId', async (req, res) => {
    try{
        const recipes = await Recipe.find({userId: req.params.userId});
        res.status(200).send(recipes);
    } catch(err){
        res.status(404).send("User does not have any recipes");
    }
});

module.exports = router;