const mongoose = require("mongoose"); 

const recipeSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    ingredients: {
        type: [String], 
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    //add user id : if userId is null, the recipe is global, otherwise it belongs to a specific user
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    isGlobal:{
        type: Boolean,
        default: true //automatically set to true if userId is null 
    }
});

module.exports = mongoose.model('Recipe', recipeSchema);