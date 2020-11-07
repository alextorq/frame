const express = require('express');
const mongoose = require('mongoose');
const connection = require('./Utils/Connection');
const Cinema = require('./Routes/Cinema');
const cors = require('cors')
const session = require('express-session')
const env = require('dotenv').config({ path: `${__dirname}/`});


const envParse = env.parsed
const app = express();
const port = parseInt(envParse.EXPRESS_PORT) || 3000

if (envParse.MODE === 'develop') {
    app.use(cors({
        credentials: true,
        origin: "http://localhost:8080"
    }))
}
app.disable('x-powered-by');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(express.static('public'))

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.use('/cinema', Cinema)
