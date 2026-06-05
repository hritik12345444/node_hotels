const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    },
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

personSchema.pre('save', async function () {

    const person = this; // Current person document

    // If password is not modified, skip hashing
    // Example: user updates age or name only
    if (!person.isModified('password')) {
        return;
    }

    try {
        // Generate a salt (10 rounds)
        // Higher value = more secure but slower
        const salt = await bcrypt.genSalt(10);

        // Hash the plain text password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // Replace plain password with hashed password
        person.password = hashedPassword;

    } catch (err) {
        console.error('Error while hashing password:', err);

        // Throw error so save operation fails
        throw err;
    }
});


personSchema.methods.comparePassword = async function(candidatePassword){
    try{

        // use bcrypt to compare the provided password with the hashed password 
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;

    }catch(err){
        throw err;
    }
}

// Create person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;