const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect('mongodb://127.0.0.1:27017/c48-g2');
}

module.exports = connectDB;