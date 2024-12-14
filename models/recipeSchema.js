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
    //add user id : can belong to a specific user or global user (global user List can be accessed by everyone)
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Recipe', recipeSchema);