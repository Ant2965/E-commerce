const express = require('express')
const colors = require('colors');
const dotenv = require("dotenv")
const app = express();
const morgan = require('morgan');
const authroutes = require('./routes/authroute.js')
const connectdb = require('./config/db');

dotenv.config();


//db config

connectdb();



//middlewares
app.use(express.json())
app.use(morgan('dev'))








// routes

app.use('/api/v1/auth', authroutes);

app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to the app'
    })
})

//port


const PORT = process.env.PORT || 6060;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`.bgCyan.white)
})
