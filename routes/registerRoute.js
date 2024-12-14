const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bodyParser = require('body-parser');
const { User } = require('../models/userSchema');
const express = require('express');

const router = express.Router();

//Secret key 
const JWT_SECRET = process.env.JWT_SECRET;

//JWT secret validation 
if(!JWT_SECRET){
    throw new Error ('JWT_SECRET is not defined in your .env file!')
}

//Passport Strategy 
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
}

passport.use(new Strategy(options, async (payload, done) => {
    try{
        const user = await User.findById(payload.id);
        if(!user){
            return done(null, false);
        }
        return done(null, user);
    } catch(err) {
        return(err, false);
    }
}));

router.post('/addUser', async (req, res) => {
    const { username, email, password } = req.body;

    try{
        //checks if user exists via email
        const users = await User.findOne({email},{username});
        if(users){
            return res.status(400).json("User already exists")
        }
        
        //Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        //create new user object
        const user = new User({username, email, password: hashedPassword});
        await user.save();
        res.status(201).json({message: 'User created successfully'}); 
        //need to check if account already exists

    } catch (err){
        res.status(500).send("Registration failure");
    }
})

//user login 
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try{
        //check if the user exists
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json('User not found');
        }

        //Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json('Invalid credentials')
        }

        //Generate a JWT token 
        const token = jwt.sign({id: user._id, email: user.email }, JWT_SECRET,{expiresIn: '1h'});

        res.status(200).json('Login successful');

    } catch(err){
        console.error(err);
        res.status(500).json('Login Failed', err.message);
    }
})

//user log out?
router.post('logout', )

//Edit user 

//Edit password

module.exports = router;