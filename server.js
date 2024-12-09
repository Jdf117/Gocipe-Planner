const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const recipeRoutes = require('./routes/recipeRoutes');
const groceryList = require('./routes/groceryListRoutes');


const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(express.json());

app.use('./api//recipes', recipeRoutes);
app.use('./api/grocery-List', groceryList);

//MongoDB connection
mongoose.connect(MONOGO_URI)
    .then(() => console.log("connected to MONGODB"))
    .catch((err) => console.log(err));

//server start    
app.listen((PORT, () => console.log(`Server running on port ${PORT}`)));

