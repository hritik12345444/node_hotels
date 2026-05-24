// import express for establish localhost
const express = require('express');
const app = express();

// import db file which is a connection file between node js and DB
const db =  require('./db');

// body-Parser for convert JSON formate data or so on into javascript object
const bodyParser = require('body-parser');
app.use(bodyParser.json());  // after converting the JSON data into js object  it will stores in req.body

// this is model
const Person = require('./models/person');
const MenuItem = require('./models/MenuItem');

// basic function for show the message when file runs properly
app.get('/', function(req,res) {
    res.send("welcome to my hotel... How can i help you ?")
})




// Import the router files of person 
const personRoutes = require('./routes/personRoutes');
// use the routers
app.use('/person', personRoutes); // personRoutes me se sbhi api me se person ko hta diye hai isseliye yeha /person bnaye hai 

// Import the router file of menuItems
const MenuRoutes = require('./routes/menuRoutes');
app.use('/',MenuRoutes);

// app is listining on port no. 30000
app.listen(3000, () =>{
    console.log("listining on port 3000")
})
