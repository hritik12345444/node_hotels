const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;  // this strategy is use to authenticate using username and passport 
const Person = require('./models/person')


passport.use(new LocalStrategy(async (USERNAME, password, done) =>{
    // authentication logic
    try{
        console.log("Received crenditals", USERNAME, password);
        const user = await Person.findOne({username : USERNAME});

        if(!user){
            return done(null, false, {message : 'Incorrect username'});
        }

        // const isPasswordMatch = user.password === password ? true : false;
        const isPasswordMatch = await user.comparePassword(password);  // comparepassword is a function for calcute resutl true or false
        if(isPasswordMatch){
            return done (null, user);
        }else{
            return done(null, false, {message : 'Incorrect password'});
        }

    }catch(err){
        console.log(err);
        return done(err);
    }
} ))


module.exports = passport; // export configured passport