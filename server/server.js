const express = require('express')
const mongoose = require('mongoose');
require('express-async-errors');
const postRouter = require('./routers/post.router');

const port = 3000
const app = express();

app.use(express.json());
app.get('/', (req, res) => res.send('Hello World'));
app.use(postRouter);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json(err.message)
});

(async function run() {
    try {
        await mongoose.connect('mongodb://localhost:27017/post', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database is connected');
    } catch (error) {
        console.error(error)
    }
    
    app.listen(port, () => {
        console.log('Server is up and running')
    });
})();