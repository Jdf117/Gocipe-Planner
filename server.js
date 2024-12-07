const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(express.json());

//MongoDB connection
mongoose.connect(MONOGO_URI)
    .then(() => console.log("connected to MONGODB"))
    .catch((err) => console.log(err));

app.listen((PORT, () => console.log(`Server running on port ${PORT}`)));

