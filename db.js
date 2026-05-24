// import mongoose for connect MongoDB to Node.js
const mongoose = require('mongoose');

// Define MongoDB connection URL 
const mongoURL = 'mongodb://localhost:27017/hotels'; // here hotels is database name

// Connect to MongoDB
mongoose.connect(mongoURL);

// Default connection object
const db = mongoose.connection;

// Event listeners optional
db.on('connected', () => {
    console.log("Connected to MongoDB server");
});

db.on('error', (err) => {
    console.log("MongoDB connection error:", err);
});

db.on('disconnected', () => {
    console.log("MongoDB disconnected");
});

// Export
module.exports = db;