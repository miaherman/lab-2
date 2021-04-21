const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: { 
        type: 'String', 
        required: true, 
        unique: true },
    text: 'String',
    created: { type: 'String', required: true }
});

const PostModel = mongoose.model('post', postSchema);

module.exports = PostModel;