const express = require('express');
const PostModel = require('../models/post.model');
const router = express.Router();

//Gets all posts 
router.get('/api/post', async (req, res) => {
    const docs = await PostModel.find({});
    res.status(200).json(docs);
});

// Get specific posts for one user
router.get('/api/post/:id', async (req, res) => { // Kanske ????
    const docs = await PostModel.find({});
    res.status(200).json(docs);

    //if logged in
});

//Create post
router.post('/api/post', async (req, res) => {

    // Hämta och kontrollera om en användare är inloggad ifrån sessionen
    // Skapa Post inkluderat text och inloggad användare
    // Spara Post

    if(req.session.loggedInUser) {

    }
    
    const doc = await PostModel.create(req.body);
    res.status(201).json(doc);
});

//Delete post
router.delete('/api/post', async (req, res) => {
    
    const doc = await PostModel.deleteOne(req.body);
    res.status(201).json(doc);
});

module.exports = router;