const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config();

//Middlewares
// app.use('/posts', (rew, res, next) => {
//         console.log('Hello this is a middleware running.');
//         next()
//     })
// app.use(auth)
app.use(cors())
app.use(bodyParser.json())

app.use(express.json())

//Import Routes
const postsRoute = require('./Routes/posts')
app.use('/posts', postsRoute)

app.get('/', (req, res) => {
    res.send("We are on home")
})

//Connect to db

mongoose.connect(
    process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true },
    function(err, res) {
        try {
            console.log('Connected to Database')
        } catch (err) {
            throw err;
        }
    })

//How we start listening to the server
app.listen(3000)