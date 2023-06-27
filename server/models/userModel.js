const mongoose = require('mongoose');

// username, password, passwordConfirm

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter your username'],

    }
})