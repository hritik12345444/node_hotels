const mongoose = require('mongoose');

// Define the Person schema
const personSchema = new mongoose.Schema({
    name : String,
    age : Number,
    work : {
        type : String,
        enum : ['chef', 'waiter', 'manager', 'guiest'],  // yehi 3 me se koi ek hoga otherwise nhi accept krega kuch
        required : true
    },
    mobile : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    address :{
        type : String,
    },
    salary : {
        type : Number,
        required : true
    }
});

// Create person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;