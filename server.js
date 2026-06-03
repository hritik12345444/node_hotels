// import express for establish localhost
const express = require('express');
const app = express();
// body-Parser for convert JSON formate data or so on into javascript object
const bodyParser = require('body-parser');
app.use(bodyParser.json());  // after converting the JSON data into js object  it will stores in req.body
require('dotenv').config();
const passport = require('./auth');
const db =  require('./db'); // import db file which is a connection file between node js and DB
const PORT = process.env.PORT || 3000;  // env file se port no lega agar nhi milla to 3000 ko use krr lega



// Middleware function define  it is use to perfrom a task
const logRequest = (req, res, next) =>{
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl} URL`); // new data = current data and (req.originalUrl = kis url se execute hua hai )
    next();    // it is compulsory to write here for execute next part of route after excuting this middleware
}

app.use(logRequest);  // ye abb kisi bhi route pe move kre to ye middleware execute krega 


app.use(passport.initialize());
const localAuthMiddleware =  passport.authenticate('local', {session : false});   // use for take user and password for get users


// basic function for show the message when file runs properly
app.get('/', function(req,res) {  
    res.send("welcome to my hotel... How can i help you ?")
})


// This is model
const Person = require('./models/person');
const MenuItem = require('./models/MenuItem');


// Import the router files of person 
const personRoutes = require('./routes/personRoutes');
// use the routers
app.use('/person',localAuthMiddleware, personRoutes); // personRoutes me se sbhi api me se person ko hta diye hai isseliye yeha /person bnaye hai 
// Import the router file of menuItems
const MenuRoutes = require('./routes/menuRoutes');
app.use('/', MenuRoutes);


// app is listining on port no. 30000
app.listen(PORT, () =>{
    console.log("listining on port 3000")
})
