const mongoose = require("mongoose"); 

const groceryListSchema = ({
    userId: {
        type: String, 
        required: true
    },
    items: {
        type: [String],
        required: true,
    },
    completed: {
        type: Boolean,
         default: false
    }
})

module.exports = mongoose.model('GroceryList', groceryListSchema);