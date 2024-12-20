const express = require('express');
const Recipe = require('../models/recipeSchema'); 
const  User  = require('../models/userSchema');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

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
    //console.log("Incoming request body", req.body);
    const { name, ingredients, instructions, category, username} = req.body;

    try{
        let userId = null;
        if(username){
            console.log(username)
            const user = await User.findOne({username: username})
            console.log(user);
            if(!user){
                return res.status(404).json('User not found')
            }
            userId = user._id;
        }
        const recipe = new Recipe({
            name, 
            ingredients, 
            instructions, 
            category, 
            username: userId || null,
            isGlobal: !userId
        });
        console.log(recipe)
        await recipe.save();
        res.status(201).send(recipe);
    } catch (err) {
        console.log(err);
        res.status(500).json("Could not add recipe");
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

//publish recipe
router.put('/publishRecipe/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const recipe = await Recipe.findByIdAndUpdate(
            id,
            { userId: null, isGlobal: true }, // Mark it as global
            { new: true } //return the updated recipe
        );

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json({ message: 'Recipe published successfully', recipe });
    } catch (err) {
        res.status(500).json({ message: 'Failed to publish recipe', error: err.message });
    }
});


//edit recipe
router.put('/updateRecipe/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const { id } = req.params; 
    const {name, ingredients, instructions, category} = req.body;
    const userId = req.user_id; //extract user ID from authenticated token

    try{
        //find recipe belonging to logged in user 
        const recipe = await Recipe.findOne({ _id: id, username: userId})

        if(!recipe){
            return res.status(404).json({message: 'Recipe not found'})
        }

        //update recipe
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            { _id: id, username: userId},//match recipe ID and userId
            { name, ingredients, instructions, category}, //fields to update 
            {new: true, runValidators: true } //return updated recipe and validate input
        );

        res.status(200).json({message: 'Recipe updated successfully', recipe: updatedRecipe})
    } catch(err) {
        console.log(err);
        res.status(500).json('Failed to update recipe');
    }
})

//Delete recipe based on userId
router.delete('/deleteRecipe/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
      const { id } = req.params; // Recipe ID from the URL
      const userId = req.user._id; // Extract user ID from the authenticated token
  
      try {
        //Find the recipe belonging to the logged in user
        const recipe = await Recipe.findOne({ _id: id, userId });
  
        if (!recipe) {
          return res.status(404).json({ message: 'Recipe not found or unauthorized' });
        }
  
        //Delete the recipe
        await Recipe.findOneAndDelete({ _id: id, userId });
  
        res.status(200).json({ message: 'Recipe deleted successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete recipe', error: err.message });
      }
    }
  );

module.exports = router;