const express = require('express');
const Recipe = require('../models/recipeSchema');

const router = express.Router();

router.post('/', async (req, res) => {
    try{
        const recipe = new Recipe(req.body);
        await recipe.save();
        res.status(201).send(recipe);
    } catch (err) {
        console.log("Could not add note");
    }
});

router.get('/:userId', async (req, res) => {
    try{
        const recipes = await Recipe.find({userId: req.params.userId});
        res.status(200).send(recipes);
    } catch(err){
        res.status(404).send("User does not have any recipes");
    }
})

module.exports = router;