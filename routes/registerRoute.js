const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bodyParser = require('body-parser');
const  User  = require('../models/userSchema');
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
        console.log(email);
        console.log(password);
        const emailCheck = await User.findOne({email});
        console.log(emailCheck);
        if(emailCheck){
            return res.status(400).json("This email already exists")
        }

        //Checks if username exists
        const usernameCheck = await User.findOne({username});
        if(usernameCheck){
            return res.status(400).json("Username already exists")
        }
        
        //Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        //create new user object
        const user = new User({username, email, password: hashedPassword});
        console.log(user);
        await user.save();
        res.status(201).json({message: 'User created successfully'}); 
        //need to check if account already exists

    } catch (err){
        console.log(err);
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

        res.status(200).json({ message: 'Login successful', accessToken: token});

    } catch(err){
        console.error(err);
        res.status(500).json({message: 'Login Failed',  err});
    }
})

//user log out?
router.post('logout', )

//Edit user 
router.put('/updateProfile', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const {username, email} = req.body;
    try{
        const updateUser = await User.findByIdAndUpdate(
            req.user._id,
            {email},
            {new: true}
        );
        res.status(200).json({message: 'Profile updated', user: updateUser});
    } catch (err){
        res.status(500).json('Failed to update profile', err);
    }
});

//Edit password
router.post('resetPassword', async (req , res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).json('User not found');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json('Password updated');
    } catch(err){
        res.status(500).json('Could not reset password');
    }
})

module.exports = router;