const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Router = require('./router/Router');
const cors = require('cors');

// CONFIGURATION VARIABLES
require('dotenv').config();

// CORS CONFIRGURATION 
app.use(cors());

// MIDDLEWARE (FOR JSON USAGE)
app.use(express.json());

// ENVIRONMENTAL VARIABLES
const db_url = process.env.DBURL;
const port = process.env.PORT || 6000;

// MONGO_DB CONNECTION
const connect = ()=>{
    mongoose.connect(db_url);
    try{
        console.log('DB Connection Authenticated');
    } catch(err){
        console.log({err: err});
    }
}

// ROUTES
app.get('/', (req,res)=>{
    res.send('Welcome to Perfumery');
})

// ROUTES MIDDLEWARE
app.use('/stores', Router)

app.listen(port, ()=>{
    console.log(`DB Connection Established ${port}`);
    connect()
})