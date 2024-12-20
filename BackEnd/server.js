const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();

const recipeRoutes = require('./routes/recipeRoutes');
const groceryList = require('./routes/groceryListRoutes');
const authentication = require ('./routes/registerRoute');


const app = express();
const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI;

//Middleware
app.use(cors());
app.use(express.json());
//personal note: line above replaced app.use(bodyParser()). 

//MongoDB connection
mongoose.connect(MONGO_URI)
    .then(() => console.log("connected to MONGODB"))
    .catch((err) => console.log(err));

//Routes
app.use('/recipes', recipeRoutes);
app.use('/grocery-List', groceryList);    
app.use('/register', authentication);

//server start    
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

