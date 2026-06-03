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

personSchema.pre('save', async function(next){
    const person = this;  // accesss the person scema

    // agar password modified krna hai to ye true return krega agar password modifi (hashed) nahi krna hai to false return krega
    if(!person.isModified('password')){
        return next();
    }

    try{
        // salt generation
        const salt = await bcrypt.genSalt(10);  // 10 ye jaga rhne se pass uthan secure hoga lekin hasing algorithm per time lgegaa jaada hone se
        
        // hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);
        // override the plain password with the hashed pass
        person.password = hashedPassword;

        next();  // called for store the hashed pass in DB , called after hashed pass is generated 
    }catch(err){
        console.log(err);
        return next;
    }
})

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