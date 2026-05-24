// iss file me person ke related jitna bhi routes honge wo sbhi issi me routes bnayenge 

const express = require('express');    // for server bnaan , routes bnaana, requests handles krna
const router = express.Router();
const Person = require('./../models/person');


// sare method me jbb /person hi hai to hmm sbhi jagah likhne se aacha hai ki server file me jha isse import kiye hai wha pe hi /person krr de aur iss file me person ko htta de only / hi rakhe
// example router.post('/', async(req,res) =>{})    // menuRoutes wala file me iss thr se nhi kiye hai wo dusra trika wlaa hai usme
router.post('/', async(req,res) =>{
    try{
        const data = req.body; // assuming teh request body contains the person data

        // create a new person document using the Mongoose model method 1
        const newPerson = new Person(data);

        // method 2 this is also correct for small data because we can write it same for multiple time but for large data it is not good we have its alternative 

        // const newPerson = new Person();
        // newPerson.name = data.name;
        // newPerson.age = data.age;
        // newPerson.mobile = data.mobile;
        // newPerson.email = data.email;
        // newPerson.address = data.address;
        // newPerson.work = data.work;
        // newPerson.salary = data.salary;

        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'internal server Error'});
    }

})


router.get('/', async(req,res) =>{
    try{
        const data = await Person.find();
        console.log('Data fatched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
    }
})


// Parametrized api calls
router.get('/:workType', async(req,res) =>{
    try{
        // fetche the what the api variable calls  as workType
        const workType = req.params.workType;
        // checks for if user send unnecessary word, if their words on present in person model than do something otherwise not need to call database for get data 
        if(workType == 'chef' || workType == 'guiest' || workType == 'manager'){
            const response = await Person.find({work : workType}); // select only work == workType
            console.log('response fethced');
            res.status(200).json(response);

        }else{
            res.status(404).json({error : 'invalid parameter workType'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error : 'internal server error'});
    }
})

// Update data in database
router.put('/:id', async (req,res)=>{
    try{

        const personId = req.params.id; // Extract the id from the URL parameters
        const updatePersonData = req.body; // Updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
            new : true, // return the updated document
            runValidators : true, // Run mongoose validator
        })

        if(!response){
            return res.status(404).json({error : 'Person not found'});
        }

        console.log("data updated");
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error '});
    }
})


// Delete data from database
router.delete('/:id', async (req,res) =>{
    try{

        const personId = req.params.id;  // Extract person's id
        const response = await Person.findByIdAndDelete(personId);   // search and delete
       
        if(!response){  // if response == nulll or invalid than do this..
            return res.status(404).json({error : 'person not found'});
        }

        console.log('data deleted');
        res.status(200).json({message : 'person Deleted successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error '});
    }
})
module.exports = router;