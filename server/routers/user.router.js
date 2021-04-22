const express = require('express')
const router = express.Router();
const bcrypt = require("bcrypt");
let UserModel = require("../models/user.model");

//Create account
router.post('/api/user/register', async (req, res) => {
    const { username, password } = req.body;
    const existinguser = users.find(u => u.username === username);
    
    //Check if the user exists    
    if(existinguser) {
        res.status(400).json("Username exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
        username,
        password: hashedPassword
    }

    // users.push(user);
    // res.status(201).json();

    // lägger till i databasen
    const doc = await UserModel.create(req.body);
    res.status(201).json(doc);
});

//Log in
router.post('/api/user/login', async (req, res) => {
    const { username, password } = req.body;
    //const user = users.find(u => u.username === username);
    const user = await UserModel.find({});

    if(!user || !await bcrypt.compare(password, user.password)) {
        res.status(401).json("Incorrect password or username");
        return
    }

    // Hämta användare som skall logga in utifrån användarnamn och lösenord
    // Spara den hämtade användaren i Sessionen
    // Skicka tillbaka feedback (true)
    req.session.loggedInUser = user.username
    res.status(201).json(user);

});

module.exports = router;