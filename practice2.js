// conversition object to string and string to object

// const jsonString = '{"name": "john", "age": 30, "city": "New York"}';
// const jsonObject = JSON.parse(jsonString);
// console.log(jsonObject);
// console.log(typeof(jsonObject))
// console.log(JSON.stringify(jsonObject))
// console.log(typeof(JSON.stringify(jsonObject)))

console.log("We are creating a server using express.....");

const express = require('express');
const app = express();

app.get('/', function(req,res){
    res.send("Welcome to our server...");
})

app.get('/home',(req,res) =>{
    res.send("This is home page");
})

// try something 
app.get('/about',(req,res) =>{

    var customize = {
        name : "Hritik",
        Roll : 37,
        Religion : "Hindu"
    }
    
    res.send(customize);
})


app.post('/items', (req,res) =>{
    res.send("items saved");
})


app.post('/person', (req,res) =>{
    res.send("person details saved...");
})
// method 1
// app.listen(3000);    


// method 2 
app.listen(3000, ()=>{  // optional we can also define a function inside app.listen 
    console.log("Server is listining on port no. 3000...");
})
