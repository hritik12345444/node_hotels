const express = require('express')
const router = express.Router();
const MenuItem = require('../models/MenuItem');


router.post('/MenuItem', async (req, res) => {
    try {
        const data = req.body;
        const newMenuItem = new MenuItem(data);
        const response = await newMenuItem.save();
        console.log('data saved');
        res.status(200).json(response);

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'internal server error' });
    }
})

router.get('/MenuItem', async (req, res) => {
    try {
        // const data = await MenuItem.find({price : {$lt : 3}});  // return data with the price is less tan 3
        const data = await MenuItem.find(); // return all data of MenuItem
        console.log("Menu data fatched...");
        res.status(200).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
    }
})

// parametrized apis according to their need
router.get('/MenuItem/:choice', async (req, res) => {
    try {

        const choice = req.params.choice;
        if (choice == 'Sweet' || choice == 'Spicy' || choice == 'Sour') {
            const response = await MenuItem.find({ taste: choice });
            console.log('data fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'invalid parameter workType' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error, baki hmm nahi jante' })
    }
})


// Update menuItem
router.put('/menuItem/:id', async (req, res) => {
    try {

        const menuId = req.params.id;  // extract menu's id 
        const updatedData = req.body; // extract updated data

        const response = await MenuItem.findByIdAndUpdate(menuId, updatedData, {
            new: true, // return the updated document
            runValidators: true, // Run mongoose validator
        })

        if (!response) {
            return res.status(404).json({ error: 'Item not found' });
        }

        console.log("Data Updated");
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error..' });
    }
})


// Delete menuItem
router.delete('/menuItem/:id', async (req, res) => {
    try {
        const DeletedMenuId = req.params.id; // Extract menu's id
        const response = await MenuItem.findByIdAndDelete(DeletedMenuId);  // search and deleted it 

        if (!response) {
            return res.status(400).json({ error:  'Item` not founnd' });
        }

        console.log('data deleted');
        res.status(200).json({ message: 'Item  deleted successfully' });

    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error , baki hmko nahi malum'});
    }
    
})

// comment added for testing purpose
module.exports = router;