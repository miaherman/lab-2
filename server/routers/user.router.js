const express = require('express')
const router = express.Router();
const bcrypt = require("bcrypt");
let UserModel = require("../models/user.model");

//Get all users FUNKAR
router.get('/api/user', async (req, res) => {
    const docs = await UserModel.find({});
    res.status(200).json(docs);
});

//Create account FUNKAR
router.post('/api/user/register', async (req, res) => {
    const { username, password } = req.body;

    const existinguser = await UserModel.findOne({ username: req.body.username });

    //Check if the user exists    
    if(existinguser) {
        return res.status(400).json("Username exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({username, password: hashedPassword})

    // lägger till i databasen
    const doc = await UserModel.create(newUser);
    res.status(201).json(doc);
});

//Log in FUNKKAR!!!!!!
router.post('/api/user/login', async (req, res) => {
    // const { username, password } = req.body;

    const user = await UserModel.findOne({ username: req.body.username })

    if (!user || (!await bcrypt.compare(req.body.password, user.password))) {
        return res.status(401).json("Wrong username or password");
    }
    // Spara den hämtade användaren i Sessionen
    req.session.user = user._id
    console.log(req.session.user)
    res.status(201).json("You are logged in!");  
    

});

//delete session FUNKAR!!!!!
router.delete('/api/user/logout', async (req, res) => {
    
    if (req.session.user) {
        req.session = null;
        res.json('Byeyeyeyeye');
        return
    }

    res.status(404).json('No user is logged in');
    
})

module.exports = router;