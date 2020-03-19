//Import libraries
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

//Import routers
const accountsRouter=require("./accounts/accounts-router");

const db = require('./data/dbConfig.js');

//Activate imports
const server = express();

//Inject import functionality
server.use(express.json());
server.use(cors());
server.use(helmet());

//Declare server use routing
server.use("/api/accounts",accountsRouter);

//Initial requests
server.get("/",(req,res)=>{
    res.status(200).json({message:"The API is UP & working fine"});
});

module.exports = server;