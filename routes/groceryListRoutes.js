const express = require('express');
const GroceryList = require('../models/groceryListSchema');

const router = express.Router();

//create a groceryList
router.post('/', async (req, res) => {
    try{
        const groceryList = new GroceryList(req.body);
        await groceryList.save();
        res.status(201).send(groceryList);
    } catch (err) {
        res.status(404).send("could not add GroceryList");
    }
})

module.exports = router; 