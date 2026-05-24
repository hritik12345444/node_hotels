const mongoose = require('mongoose');

const menuItemScema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    taste : {
        type : String,
        enum : ['Sweet', 'Spicy', 'Sour'],
        required : true,
    },
    is_drink : {
        type : Boolean,
        default : false,
    },
    ingredients :{
        type : String,
        default : ["chicken wings", "spices",  "sauce"],
    },
    num_sales : {
        type : Number,
        default : 0,
    }
})

const MenuItem = mongoose.model('MenuItem', menuItemScema);
module.exports = MenuItem;