const express = require('express')
const router = express.Router();
const bcrypt = require("bcrypt");
let UserModel = require("../models/user.model");
const secure = require("../middleware/secure");

//Hämtar alla användare
router.get('/api/user', async (req, res) => {
    const docs = await UserModel.find({});
    res.status(200).json(docs);
});

//Skapar ett konto
router.post('/api/user/register', async (req, res) => {
    const { username, password } = req.body;

    const existinguser = await UserModel.findOne({ username: req.body.username });

    //Kollar om användaren existerar
    if(existinguser) {
        return res.status(400).json("Username exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({username, password: hashedPassword})

    //Lägger till användaren i databasen
    const doc = await UserModel.create(newUser);
    res.status(201).json("New user created!");
});

//Loggar in användaren
router.post('/api/user/login', async (req, res) => {

    const user = await UserModel.findOne({ username: req.body.username }).select('+password')
     
    if (!user || (!await bcrypt.compare(req.body.password, user.password))) {
        return res.status(401).json("Wrong username or password");
    }
    //Sparar den hämtade användaren i sessionen
    req.session.user = user._id
    req.session.username = user.username
    delete user.password
    res.status(201).json(user);  
});

//Kollar av sessionen mot en specifik användare
router.post('/api/user/authenticate', secure, (req, res) => {
    res.status(200).json({
        _id: req.session.user,
        username: req.session.username
    })
})

//Avbryter sessionen och loggar ut användaren
router.delete('/api/user/logout', async (req, res) => {
    
    if (req.session.user) {
        req.session = null;
        res.json('Byeyeyeyeye');
        return
    }

    res.status(404).json('No user is logged in');
    
})

module.exports = router;